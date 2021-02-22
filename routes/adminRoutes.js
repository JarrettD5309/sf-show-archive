const db = require('../models');
const fs = require('fs');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const mime = require('mime-types');

module.exports = app => {

    // const req.session.admin = true;

    // SEARCH SHOW NUMBER
    app.get('/admin/shows', (req, res) => {
        // if (req.session.admin) {
        if (req.session.admin) {
            const showNum = req.query.showNum;

            const queryObj = {};
            if (showNum) {
                queryObj.showNum = showNum;
            }
            db.Show.find(queryObj)
                .then(result => {
                    db.ShowDetails.findOne({ showId: result[0]._id })
                        .populate('showId')
                        .populate('flyer.contributed')
                        .populate('setList.contributed')
                        .populate('audio.contributed')
                        .populate('video.contributed')
                        .populate('review.contributed')
                        .populate('attendance')
                        .then(newResult => {
                            res.json([newResult, result[0]]);
                        })
                        .catch(err => res.json(err));
                })
                .catch(err => res.json(err));
        } else {
            res.sendStatus(404);
        }
    });

    // UPDATE SHOW INFO
    app.put('/admin/shows', (req, res) => {
        if (req.session.admin) {
            const _id = req.body._id;
            const showNum = req.body.showNum;
            const date = req.body.date;
            const venue = req.body.venue;
            const address = req.body.address;
            const city = req.body.city;
            const stateCountry = req.body.stateCountry;

            const updateObj = {
                showNum: showNum,
                date: date,
                venue: venue,
                address: address,
                city: city,
                stateCountry: stateCountry
            }

            if (_id && showNum && date && city && stateCountry) {
                db.Show.updateOne({ _id: _id },
                    updateObj
                )
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
    });

    // ADD NEW SHOW
    app.post('/admin/shows', (req, res) => {
        if (req.session.admin) {
            const showNum = req.body.showNum;
            const date = req.body.date;
            const venue = req.body.venue;
            const address = req.body.address;
            const city = req.body.city;
            const stateCountry = req.body.stateCountry;

            const newShow = {
                showNum: showNum,
                date: date,
                venue: venue,
                address: address,
                city: city,
                stateCountry: stateCountry
            };

            if (showNum && date && city && stateCountry) {
                db.Show.find({ showNum: showNum })
                    .then(results => {
                        if (results.length === 0) {
                            db.Show.create(newShow)
                                .then(result => res.json(result))
                                .catch(err => res.json(err));
                        } else {
                            res.status(400).send('showNumExists');
                        }
                    })
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
    });

    // DELETE A SHOW
    app.delete('/admin/delete-show', (req, res) => {
        if (req.session.admin) {
            const _id = req.query._id;
            console.log(req.query._id);

            db.Show.deleteOne({
                _id: _id
            })
                .then(results => {
                    res.json(results);
                })
                .catch(err => console.log(err));
        } else {
            res.sendStatus(404);
        }
    });

    // GET USER INFO
    app.get('/admin/user', (req, res) => {
        if (req.session.admin) {
            const username = req.query.username;
            db.User.findOne({ username: username })
                .then(result => {
                    res.json(result);
                })
                .catch(err => console.log(err));
        } else {
            res.sendStatus(404);
        }
    });

    // BAN AND UNBAN USER
    app.put('/admin/user', (req, res) => {
        if (req.session.admin) {
            const username = req.body.username;
            const banned = req.body.banned;

            const updateUserObj = {
                banned: banned
            };

            db.User.findOne({ username: username })
                .then(result => {
                    if (result.admin) {
                        res.status(400).send('cantBanAdmin');
                    } else {
                        db.User.updateOne({ username: username }, updateUserObj)
                            .then(result => res.json(result));
                    }
                })
                .catch(err => console.log(err));

        } else {
            res.sendStatus(404);
        }
    });

    // REMOVE RECORD OF USER ATTENDANCE AT SHOW
    app.put('/admin/delete-attendance', (req, res) => {
        if (req.session.admin) {

            if (req.body.userId && req.body.showId) {
                const userId = req.body.userId;
                const showId = req.body.showId;
                // console.log(req.body.userId);

                db.ShowDetails.updateOne({ showId: showId },
                    {
                        $pullAll: {
                            attendance: [userId]
                        }
                    })
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            } else {
                res.sendStatus(400);
            }

        } else {
            res.sendStatus(404);
        }
    });

    // REMOVE SHOW DETAIL
    app.put('/admin/delete-detail', (req, res) => {
        if (req.session.admin) {

            if (req.body.detailId && req.body.showId && req.body.detailType) {
                const detailId = req.body.detailId;
                const showId = req.body.showId;
                const detailType = req.body.detailType;
                const imgName = req.body.imgName;

                const updateObj = {};

                if (detailType === 'audio') {
                    updateObj.$pull = {
                        audio: {
                            _id: detailId
                        }
                    };
                } else if (detailType === 'video') {
                    updateObj.$pull = {
                        video: {
                            _id: detailId
                        }
                    };
                } else if (detailType === 'review') {
                    updateObj.$pull = {
                        review: {
                            _id: detailId
                        }
                    };
                } else if (detailType === 'flyer') {
                    updateObj.$pull = {
                        flyer: {
                            _id: detailId
                        }
                    };
                }

                db.ShowDetails.updateOne({ showId: showId }, updateObj)
                    .then(result => {
                        if (detailType === 'flyer') {
                            const filePath = './client/public/uploads/' + imgName;
                            fs.unlink(filePath, (err) => {
                                if (err) throw err;
                                console.log(filePath + ' was deleted');
                            })
                        }
                        res.json(result);
                    })
                    .catch(err => res.json(err));
            } else {
                res.sendStatus(400);
            }

        } else {
            res.sendStatus(404);
        }
    });

    // UPDATE SETLIST
    app.put('/admin/setlist', (req, res) => {
        if (req.session.admin) {

            if (req.body.showId && req.body.setlist) {
                const showId = req.body.showId;
                const setlist = req.body.setlist;
                db.ShowDetails.updateOne({ showId: showId }, {
                    $set: {
                        'setList.songs': setlist
                    }
                })
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            } else {
                res.sendStatus(400);
            }

        } else {
            res.sendStatus(404);
        }
    });

    // GET ALL SUBMISSIONS
    app.get('/admin/submissions', (req, res) => {
        if (req.session.admin) {
            db.ApproveDetails.find()
                .populate('showId')
                .populate('flyer.contributed')
                .populate('setList.contributed')
                .populate('audio.contributed')
                .populate('video.contributed')
                .populate('review.contributed')
                .sort('submittedOn')
                .then(result => {
                    res.json(result);
                })
                .catch(err => res.json(err));
        } else {
            res.sendStatus(404);
        }
    });

    // DELETE A SUBMISSION WHEN REJECETED
    app.delete('/admin/submissions', (req, res) => {
        if (req.session.admin) {
            const _id = req.query._id;

            // return the info for approvedetails entry to get img data
            db.ApproveDetails.findOne({ _id: _id })
                .then(results => {
                    console.log(results);
                    db.ApproveDetails.deleteOne({
                        _id: _id
                    })
                        .then(results2 => {
                            res.json(results2);
                            // if image submission, delete the image file as well
                            if (results.flyer.contributed) {
                                const filePath = './client/public/uploads/' + results.flyer.flyerImg;
                                fs.unlink(filePath, (err) => {
                                    if (err) throw err;
                                    console.log(filePath + ' was deleted');
                                })
                            }
                        });
                })
                .catch(err => res.json(err));
        } else {
            res.sendStatus(404);
        }
    });

    // APPROVE SUBMISSION. ADD TO SHOWDETAILS AND DELETE SUBMISSION
    app.put('/admin/submissions', (req, res) => {
        if (req.session.admin) {
            const _id = req.body._id;
            db.ApproveDetails.findOne({ _id: _id })
                .then(results => {
                    // console.log(results);
                    const updateObj = {
                        $push: {}
                    };
                    if (results.setList.songs.length > 0) {
                        updateObj.setList = results.setList
                    }

                    // console.log('audio: '+results.audio.contributed)

                    if (results.audio.contributed) {
                        updateObj.$push.audio = results.audio;
                    }
                    if (results.video.contributed) {
                        updateObj.$push.video = results.video;
                    }
                    if (results.review.contributed) {
                        updateObj.$push.review = results.review;
                    }

                    if (results.flyer.contributed) {
                        updateObj.$push.flyer = results.flyer;
                    }

                    // console.log(updateObj);

                    db.ShowDetails.findOneAndUpdate(
                        { showId: results.showId },
                        updateObj,
                        {
                            new: true,
                            upsert: true,
                            setDefaultsOnInsert: true
                        }
                    )
                        .then(results2 => {
                            db.ApproveDetails.deleteOne({ _id: _id })
                                .then(results3 => {
                                    res.json({
                                        resOne: results2,
                                        resTwo: results3
                                    });
                                })
                        })
                })
                .catch(err => res.json(err));
        } else {
            res.sendStatus(404);
        }
    });

};