const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = app => {
    app.get('/api/allstates', (req, res) => {
        db.Show.distinct('stateCountry')
            .then(result => res.json(result))
            .catch(err => res.json(err));
    });

    app.get('/api/shows', (req, res) => {
        // console.log(req.query);

        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const venue = req.query.venue;
        const city = req.query.city;
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

        if (req.query.showNum)  {
            queryObj.showNum = req.query.showNum;
        }

        if (allShows) {
            queryObj = {};
        }

        console.log(queryObj);

        db.Show.find(queryObj)
            // .sort('showNum')
            .sort({ date: 1 })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

    app.get('/api/shows/month', (req, res) => {
        console.log(req.query);

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
            // .sort({date: 1})
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

    app.post('/api/user', (req, res) => {
        // console.log(req.body);

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
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
                        const usernameIsValid = /^[a-zA-Z0-9]+$/.test(username);
                        const usernameIsLength = stringLengthTest(username, 4, 25);
                        const emailIsValid = /\S+@\S+\.\S+/.test(email);
                        const passwordIsLength = stringLengthTest(password, 7, 100);

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
                                    password: hash
                                }
                                db.User.create(userObj)
                                    .then(result => res.json(result))
                                    .catch(err => res.json(err));
                            })
                        }

                    } else {
                        res.status(400).send('userExists');
                    }
                })
        } else {
            res.status(400).send('formNotComplete');
        }

    });

    app.post('/api/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (username && password) {
            db.User.find({ username: username })
            .then(results=>{
                if (results.length===0) {
                    res.status(400).send('wrongPassUser');
                } else {
                    console.log(results[0].password);
                    const hash = results[0].password;
                    bcrypt.compare(password, hash, (err, result) => {
                        if (result) {
                            req.session.loggedin = true;
                            res.status(200).send('loggedIn');
                        } else {
                            res.status(400).send('wrongPassUser');
                        }
                    });
                }
            });
        }
    });

    app.get('/api/checklogin', (req,res)=>{
        if (req.session.loggedin) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.get('/api/logout', (req,res) => {
        req.session.destroy();
        res.sendStatus(200);
    });
};