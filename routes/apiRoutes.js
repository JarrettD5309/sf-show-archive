const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mime = require('mime-types');
const fs = require('fs');

module.exports = app => {
    // allows for import of ES module into CommonJS
    let imagemin;
    let imageminJpegtran;
    let imageminPngquant;

    const startup = async() => {
        imagemin = (await import('imagemin')).default;
        imageminJpegtran = (await import('imagemin-jpegtran')).default;
        imageminPngquant = (await import('imagemin-pngquant')).default;
    };

    startup();

    // ADD ATTENDANCE FOR EVERY SHOW 
    // app.get('/special/attendance', (req,res) => {
    //     console.log('yup');
    //     // let datesArray = [];
    //     db.Show.find()
    //     .then(res=>{
    //         // console.log(res);
    //         async function addAttendance () {
    //             const datesArray = res;

    //             for (const date of datesArray) {
    //                 console.log(date._id);
    //                 await db.ShowDetails.findOneAndUpdate(
    //                     { showId: date._id },
    //                     {
    //                         $addToSet: {
    //                             attendance: req.session.userID
    //                         }
    //                     },
    //                     {
    //                         new: true,
    //                         upsert: true,
    //                         setDefaultsOnInsert: true
    //                     }
    //                 );
    //             }
    //         };

    //         addAttendance();
    //     });
    // });

    // GETS ALL STATES AND COUNTRIES FOR DROPDOWN
    app.get('/api/allstates', (req, res) => {
        db.Show.distinct('stateCountry')
            .then(result => res.json(result))
            .catch(err => res.json(err));
    });

    // FOR SHOW SEARCH
    app.get('/api/shows', (req, res) => {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        let venue = req.query.venue;
        if (venue) {
            venue = venue.trim();
        }
        let city = req.query.city;
        if (city) {
            city = city.trim();
        }
        const allShows = req.query.allShows;
        const stateCountry = req.query.stateCountry;
        let dateQuery;

        if (endDate === '') {
            dateQuery = startDate;
        } else {
            dateQuery = {
                $gte: startDate,
                $lte: endDate
            }
        }

        let queryObj = {};

        if (dateQuery !== '') {
            queryObj.date = dateQuery;
        }

        if (venue !== '') {
            queryObj.venue = new RegExp(`^.*${venue}.*$`, `i`);
        }

        if (city !== '') {
            queryObj.city = new RegExp(`^.*${city}.*$`, `i`);
        }

        if (stateCountry !== '') {
            queryObj.stateCountry = stateCountry;
        }

        if (allShows) {
            queryObj = {};
        }

        db.Show.find(queryObj)
            .sort({ date: 1 })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

    // GETS SHOW DETAILS
    app.get('/api/showdetails', (req, res) => {
        db.Show.find({ showNum: req.query.showNum })
            .then(result => {
                db.ShowDetails.findOne({ showId: result[0]._id })
                    .populate('showId')
                    .populate('flyer.contributed', ['username', 'email'])
                    .populate('setList.contributed', ['username'])
                    .populate('audio.contributed', ['username'])
                    .populate('video.contributed', ['username'])
                    .populate('review.contributed', ['username'])
                    .populate('attendance', ['username'])
                    .then(newResult => {
                        res.json([newResult, result[0]]);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err))
    });

    // FOR USE WITH TIMELINE
    app.get('/api/shows/month', (req, res) => {
        let currentMonth = req.query.month;
        let currentYear = req.query.year;

        if (currentMonth === 'jan') {
            currentMonth = '01';
        } else if (currentMonth === 'feb') {
            currentMonth = '02';
        } else if (currentMonth === 'mar') {
            currentMonth = '03';
        } else if (currentMonth === 'apr') {
            currentMonth = '04';
        } else if (currentMonth === 'may') {
            currentMonth = '05';
        } else if (currentMonth === 'jun') {
            currentMonth = '06';
        } else if (currentMonth === 'jul') {
            currentMonth = '07';
        } else if (currentMonth === 'aug') {
            currentMonth = '08';
        } else if (currentMonth === 'sep') {
            currentMonth = '09';
        } else if (currentMonth === 'oct') {
            currentMonth = '10';
        } else if (currentMonth === 'nov') {
            currentMonth = '11';
        } else if (currentMonth === 'dec') {
            currentMonth = '12';
        }
        const dateString = `${currentYear}-${currentMonth}`;
        db.Show.find({
            date: { $gte: `${dateString}-01`, $lte: `${dateString}-31` }
        })
            .sort('showNum')
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

    // GET LATEST UPDATED SHOWS
    app.get('/api/shows/latest', (req, res) => {
        db.ShowDetails.find({'updated': { $exists : true }})
            .populate('showId')
            .populate('updated.user', ['username'])
            .sort({'updated.date': -1})
            .limit(10)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

    // CREATE ACCOUNT
    app.post('/api/user', (req, res) => {
        let username = req.body.username;
        if (username) {
            username = username.toLowerCase().trim();
        }
        const password = req.body.password;
        let email = req.body.email;
        if (email) {
            email = email.trim();
        }
        const passwordConfirm = req.body.passwordConfirm;

        const stringLengthTest = (string, min, max) => {
            const stringLength = string.length;

            if (stringLength < min || stringLength > max) {
                return false;
            } else {
                return true;
            }
        };

        if (username && email && password && passwordConfirm) {

            db.User.find({ username: username })
                .then(results => {
                    if (results.length === 0) {
                        db.User.find({ email: email })
                            .then(results2 => {
                                if (results2.length === 0) {
                                    const usernameIsValid = /^[a-zA-Z0-9]+$/.test(username);
                                    const usernameIsLength = stringLengthTest(username, 4, 25);
                                    const emailIsValid = /\S+@\S+\.\S+/.test(email);
                                    const passwordIsLength = stringLengthTest(password, 7, 100);
                                    const isAdmin = password === process.env.ADMIN_PASSWORD;

                                    if (password !== passwordConfirm) {
                                        res.status(400).send('passwordMismatch');
                                    } else if (!usernameIsValid) {
                                        res.status(400).send('usernameLettersNumbers');
                                    } else if (!usernameIsLength) {
                                        res.status(400).send('usernameLength');
                                    } else if (!emailIsValid) {
                                        res.status(400).send('emailNotValid');
                                    } else if (!passwordIsLength) {
                                        res.status(400).send('passwordLength');
                                    } else {
                                        bcrypt.hash(password, 10, (err, hash) => {
                                            const userObj = {
                                                username: username,
                                                email: email,
                                                password: hash,
                                                admin: isAdmin
                                            }
                                            db.User.create(userObj)
                                                .then(result => res.json(result))
                                                .catch(err => res.json(err));
                                        });
                                    }
                                } else {
                                    res.status(400).send('emailExists');
                                }
                            });

                    } else {
                        res.status(400).send('userExists');
                    }
                })
        } else {
            res.status(400).send('formNotComplete');
        }

    });

    // UPDATE USER ACCOUNT
    app.put('/api/userupdate', (req, res) => {
        if (req.session.loggedin) {

            const isValidForSend = (linkString, type) => {
                if (type === 'twitter') {
                    const validTwitter = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(linkString);
                    if (validTwitter || linkString === '') {
                        return true;
                    } else {
                        return false;
                    }

                } else if (type === 'instagram') {
                    const validInstagram = /http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/.test(linkString);
                    if (validInstagram || linkString === '') {
                        return true;
                    } else {
                        return false;
                    }
                }

            };

            let email = req.body.email;
            if (email) {
                email = email.trim();
            }

            let instagram = req.body.instagram;
            if (instagram) {
                instagram = instagram.trim();
            }

            let twitter = req.body.twitter;
            if (twitter) {
                twitter = twitter.trim();
            }

            const userUpdateObj = {
                email: email,
                instagram: instagram,
                twitter: twitter
            };

            const emailIsValid = /\S+@\S+\.\S+/.test(email);

            if (emailIsValid && isValidForSend(instagram, 'instagram') && isValidForSend(twitter, 'twitter')) {
                db.User.updateOne(
                    { _id: req.session.userID },
                    userUpdateObj
                )
                    .then(result => res.json(result))
                    .catch(err => res.json(err));

            } else {
                res.status(400).send('Please enter valid email/links');
            }

        } else {
            res.sendStatus(404);
        }



    });

    // LOGIN
    app.post('/api/login', (req, res) => {
        let username = req.body.username;
        if (username) {
            username = username.toLowerCase().trim();
        }
        const password = req.body.password;

        if (username && password) {
            db.User.find({ username: username })
                .then(results => {
                    if (results.length === 0) {
                        res.status(400).send('wrongPassUser');
                    } else if (results[0].banned) {
                        res.status(400).send('bannedUser');
                    } else {
                        const hash = results[0].password;
                        bcrypt.compare(password, hash, (err, result) => {
                            if (result) {
                                req.session.loggedin = true;
                                req.session.userID = results[0]._id;
                                req.session.admin = results[0].admin;
                                res.status(200).send('loggedIn');
                            } else {
                                res.status(400).send('wrongPassUser');
                            }
                        });
                    }
                });
        }
    });

    // GET USER INFO PRIVATE
    app.get('/api/getuser', (req, res) => {
        if (req.session.loggedin) {
            db.User.findById(req.session.userID, { _id: 1, username: 1, email: 1, twitter: 1, instagram: 1 })
                .then(results => {
                    res.json(results);
                })
                .catch(err => res.json(err));
        } else {
            res.sendStatus(404);
        }
    });

    // GET USER ATTENDANCE AND CONTRIBUTIONS
    app.get('/api/userattendance', (req, res) => {
        const userID = req.query.userID;
        let combinedResults = []
        db.ShowDetails.find({ attendance: userID }, { showId: 1 })
            .populate('showId')
            .then(results => {
                combinedResults.push(results);
            })
            .then(() => {
                db.ShowDetails.find({ $or: [{ "audio.contributed": userID }, { "video.contributed": userID }, { "review.contributed": userID }, { "flyer.contributed": userID }, { "setList.contributed": userID }] }, { showId: 1 })
                    .populate('showId')
                    .then(results => {
                        combinedResults.push(results);
                    })
                    .catch(err => res.json(err))
                    .then(() => {
                        res.json(combinedResults);
                    });
            });

    });

    // GET USER PUBLIC
    app.get('/api/publicuser', (req, res) => {
        let combinedResults = []
        let userID;
        // get user info
        db.User.find({ username: req.query.username }, { _id: 1, username: 1, twitter: 1, instagram: 1 })
            .then(result => {
                combinedResults.push(result);
                userID = result[0]?._id;
            })
            .then(() => {
                // get user attendance
                db.ShowDetails.find({ attendance: userID }, { showId: 1 })
                    .populate('showId')
                    .then(results => {
                        combinedResults.push(results);
                    })
                    .then(() => {
                        // get user contributions
                        db.ShowDetails.find({ $or: [{ "audio.contributed": userID }, { "video.contributed": userID }, { "review.contributed": userID }, { "flyer.contributed": userID }, { "setList.contributed": userID }] }, { showId: 1 })
                            .populate('showId')
                            .then(results2 => {
                                if (userID === undefined) {
                                    combinedResults.push([])
                                } else {
                                    combinedResults.push(results2);
                                }
                            })
                            .catch(err => res.json(err))
                            .then(() => {
                                res.json(combinedResults);
                            });
                    })
            })
    });

    // Image Upload 
    // Set Storage Engine
    const storage = multer.diskStorage({
        destination: './temp-uploads/',
        filename: (req, file, cb) => {
            cb(null, req.body.date + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });

    // Init Upload Variable
    var upload = multer({
        storage: storage,
        // limits: { fileSize: 2000000 },
        fileFilter: (req, file, cb) => {
            checkFileType(req, file, cb);
        }
    }).single('flyerImg');

    // Check File Type Function
    const checkFileType = (req, file, cb) => {
        // Allowed ext
        const filetypes = /jpeg|jpg|png/;

        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // Check mime type
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype) {
            if (req.body.showId) {
                db.ShowDetails.find({ showId: req.body.showId })
                    .then(results => {
                        // only allow 2 flyers
                        if (results.length === 0 || results[0].flyer.length < 2) {
                            return cb(null, true);
                        } else {
                            return cb({ message: 'Error: Only 2 Flyers' })
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                return cb({ message: 'Error: Form Not Valid' })
            }


        } else {
            cb({ message: 'Error: Images Only' });
        }
    };

    // UPLOAD FLYER
    app.post('/api/showflyer', (req, res) => {
        if (req.session.loggedin) {

            upload(req, res, async (err) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    if (req.file == undefined) {
                        res.status(400).json({
                            "message": "Error: No File Selected"
                        });
                    } else {
                        if (req.session.admin) { 
                                // compress image
                                await imagemin(['./temp-uploads/' + req.file.filename], {
                                    destination: './uploads',
                                    plugins: [
                                        imageminJpegtran(),
                                        imageminPngquant({
                                            quality: [0.6, 0.8]
                                        })
                                    ]
                                });

                                // delete temp full size image
                                const filePath = './temp-uploads/' + req.file.filename;
                                fs.unlink(filePath, (err) => {
                                    if (err) throw err;
                                });

                            db.ShowDetails.findOneAndUpdate(
                                { showId: req.body.showId },
                                {
                                    showId: req.body.showId,
                                    $push: {
                                        flyer: {
                                            flyerImg: req.file.filename,
                                            contributed: req.session.userID
                                        }
                                    },
                                    updated: {
                                        date: new Date(),
                                        user: req.session.userID,
                                        section: 'Flyer'
                                    }
                                },
                                {
                                    new: true,
                                    upsert: true,
                                    setDefaultsOnInsert: true
                                }
                            )
                                .then(result => res.json(result))
                                .catch(err => res.json(err));
                        } else {
                            // compress image
                            await imagemin(['./temp-uploads/' + req.file.filename], {
                                destination: './uploads',
                                plugins: [
                                    imageminJpegtran(),
                                    imageminPngquant({
                                        quality: [0.6, 0.8]
                                    })
                                ]
                            });

                            // delete temp full size image
                            const filePath = './temp-uploads/' + req.file.filename;
                            fs.unlink(filePath, (err) => {
                                if (err) throw err;
                            });
                            
                            const flyerObj = {
                                flyer: {
                                    flyerImg: req.file.filename,
                                    contributed: req.session.userID
                                },
                                showId: req.body.showId,
                                submittedOn: new Date()
                            };
                            db.ApproveDetails.create(flyerObj)
                                .then(result => res.json(result))
                                .catch(err => res.json(err));

                        }

                    }
                }
            });
        } else {
            res.status(401).json({
                "message": "Error: Must be logged in"
            });
        }
    });

    // UPLOAD SETLIST
    app.post('/api/setlist', (req, res) => {
        if (req.session.loggedin) {
            if (req.body.showId) {
                const setlistObj = {
                    setList: {
                        songs: req.body.setlist,
                        contributed: req.session.userID
                    }
                };
                if (req.session.admin) {
                    db.ShowDetails.findOneAndUpdate(
                        { showId: req.body.showId },
                        {
                            ...setlistObj,
                            updated: {
                                date: new Date(),
                                user: req.session.userID,
                                section: 'Setlist'
                            }
                        },
                        {
                            new: true,
                            upsert: true,
                            setDefaultsOnInsert: true
                        }
                    )
                        .then(result => res.json(result))
                        .catch(err => res.json(err));
                } else {
                    const submittedOn = new Date();
                    setlistObj.submittedOn = submittedOn;
                    setlistObj.showId = req.body.showId;
                    db.ApproveDetails.create(setlistObj)
                        .then(result => res.json(result))
                        .catch(err => res.json(err));
                }
            } else {
                res.status(400).json({
                    "message": "Error: Form not valid"
                });
            }

        } else {
            res.status(401).json({
                "message": "Error: Must be logged in"
            });
        }
    });

    // ADD LINKS
    app.post('/api/links', (req, res) => {
        if (req.session.loggedin) {
            if (req.body.showId) {
                const isValidUrl = (url) => {
                    try {
                        new URL(url);
                    } catch (e) {
                        return false;
                    }
                    return true;
                };

                if (req.session.admin) {
                    const linksObj = {
                        $push: {},
                        updated: {
                            date: new Date(),
                            user: req.session.userID
                        }
                    };

                    if (isValidUrl(req.body.audio)) {
                        linksObj.$push.audio = {
                            link: req.body.audio,
                            contributed: req.session.userID
                        }
                        linksObj.updated.section = 'Links - Audio';
                    }

                    if (isValidUrl(req.body.video)) {
                        linksObj.$push.video = {
                            link: req.body.video,
                            contributed: req.session.userID
                        }
                        linksObj.updated.section = 'Links - Video';
                    }

                    if (isValidUrl(req.body.review)) {
                        linksObj.$push.review = {
                            link: req.body.review,
                            contributed: req.session.userID
                        }
                        linksObj.updated.section = 'Links - Review';
                    }

                    if (linksObj.$push.audio || linksObj.$push.video || linksObj.$push.review) {
                        db.ShowDetails.findOneAndUpdate(
                            { showId: req.body.showId },
                            linksObj,
                            {
                                new: true,
                                upsert: true,
                                setDefaultsOnInsert: true
                            }
                        )
                            .then(result => res.json(result))
                            .catch(err => res.json(err));

                    } else {
                        res.status(400).json({
                            "message": "Error: Form not valid"
                        });
                    }

                } else {
                    const linksObj = {};

                    if (isValidUrl(req.body.audio)) {
                        linksObj.audio = {
                            link: req.body.audio,
                            contributed: req.session.userID
                        }
                    }

                    if (isValidUrl(req.body.video)) {
                        linksObj.video = {
                            link: req.body.video,
                            contributed: req.session.userID
                        }
                    }

                    if (isValidUrl(req.body.review)) {
                        linksObj.review = {
                            link: req.body.review,
                            contributed: req.session.userID
                        }
                    }

                    if (linksObj.audio || linksObj.video || linksObj.review) {
                        const submittedOn = new Date();
                        linksObj.submittedOn = submittedOn;
                        linksObj.showId = req.body.showId;
                        db.ApproveDetails.create(linksObj)
                            .then(result => res.json(result))
                            .catch(err => res.json(err));

                    } else {
                        res.status(400).json({
                            "message": "Error: Form not valid"
                        });
                    }

                }

            } else {
                res.status(400).json({
                    "message": "Error: Form not valid"
                });
            }

        } else {
            res.status(401).json({
                "message": "Error: Must be logged in"
            });
        }
    });

    // ADD ATTENDANCE
    app.post('/api/attendance', (req, res) => {
        if (req.session.loggedin) {
            if (req.body.showId) {
                db.ShowDetails.findOneAndUpdate(
                    { showId: req.body.showId },
                    {
                        $addToSet: {
                            attendance: req.session.userID
                        }
                    },
                    {
                        new: true,
                        upsert: true,
                        setDefaultsOnInsert: true
                    }
                )
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            } else {
                res.status(400).json({
                    "message": "Error: Form not valid"
                });
            }

        } else {
            res.status(401).json({
                "message": "Error: Must be logged in"
            });
        }
    });

    //REMOVE ATTENDANCE
    app.put('/api/attendance', (req, res) => {
        if (req.session.loggedin) {
            if (req.body.showId) {
                db.ShowDetails.updateOne({ showId: req.body.showId },
                    {
                        $pullAll: {
                            attendance: [req.session.userID]
                        }
                    })
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            } else {
                res.status(400).json({
                    "message": "Error: Form not valid"
                });
            }
        } else {
            res.status(401).json({
                "message": "Error: Must be logged in"
            });
        }
    });


    app.get('/api/checklogin', (req, res) => {
        if (req.session.loggedin) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.get('/api/checkadminlogin', (req, res) => {
        if (req.session.admin) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.get('/api/logout', (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    });

    // PASSWORD RESET ROUTES

    // CREATES TOKEN IN DB AND SENDS EMAIL
    app.post('/api/forgot-password', async (req, res, next) => {
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const email = await db.User.findOne({ email: req.body.email });

        if (email == null) {
            return res.json({ status: 'ok' });
        }

        await db.ResetTokens.updateMany(
            {
                email: req.body.email
            },
            {
                used: 1
            }
        );

        const token = crypto.randomBytes(64).toString('base64');

        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (1 * 60 * 60 * 1000));

        await db.ResetTokens.create({
            email: req.body.email,
            expiration: expireDate,
            token: token,
            used: 0
        });

        const message = {
            from: process.env.SENDER_ADDRESS,
            to: req.body.email,
            subject: process.env.FORGOT_PASS_SUBJECT_LINE,
            text: 'To reset your password, please click the link below.\n\nhttps://' + process.env.DOMAIN + '/reset-password/' + encodeURIComponent(token) + '/' + req.body.email
        };

        transport.sendMail(message, (err, info) => {
            if (err) { console.log(err); }
            else { console.log(info); }
        });

        return res.json({ status: 'ok' });
    });

    // CLEANS UP OLD TOKENS IN DB AND CHECKS CURRENT TOKEN FOR VALID
    app.get('/api/reset-password', async (req, res, next) => {

        await db.ResetTokens.deleteMany({
            expiration: { $lt: Date.now() }
        });

        const record = await db.ResetTokens.findOne({
            email: req.query.email,
            expiration: { $gt: Date.now() },
            token: decodeURIComponent(req.query.token),
            used: 0
        });

        if (record == null) {
            res.status(400).send('tokenExpired');
        } else {
            res.status(200).send('showForm');
        }
    });

    // VALIDATES NEW PASSWORD, CHECKS TOKEN, AND RESETS USER PASSWORD
    app.post('/api/reset-password', (req, res) => {
        const token = decodeURIComponent(req.body.token);
        const email = req.body.email;
        const password = req.body.password;
        const passwordConfirm = req.body.passwordConfirm;

        const stringLengthTest = (string, min, max) => {
            const stringLength = string.length;

            if (stringLength < min || stringLength > max) {
                return false;
            } else {
                return true;
            }
        };

        if (token && email && password && passwordConfirm) {
            const passwordIsLength = stringLengthTest(password, 7, 100);

            if (password !== passwordConfirm) {
                res.status(400).send('passwordMismatch');
            } else if (!passwordIsLength) {
                res.status(400).send('passwordLength');
            } else {
                db.ResetTokens.findOne({
                    email: email,
                    expiration: { $gt: Date.now() },
                    token: token,
                    used: 0
                })
                    .then(results => {
                        if (results) {
                            db.ResetTokens.updateMany({
                                email: req.body.email
                            },
                                {
                                    used: 1
                                })
                                .then(() => {
                                    bcrypt.hash(password, 10, (err, hash) => {
                                        const passwordUpdateObj = {
                                            password: hash
                                        };
                                        db.User.updateOne({
                                            email: req.body.email
                                        }, passwordUpdateObj)
                                            .then(result => res.json(result))
                                            .catch(err => res.json(err));
                                    });
                                })
                        } else {
                            res.status(400).send('tokenNotFound');
                        }
                    })
            }
        } else {
            res.status(400).send('formNotComplete');
        }

    });
};