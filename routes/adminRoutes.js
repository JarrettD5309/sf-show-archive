const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const mime = require('mime-types');

module.exports = app => {

    const isAdmin = true;

    // SEARCH SHOW NUMBER
    app.get('/admin/shows', (req, res) => {
        // if (req.session.admin) {
        if (isAdmin) {
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
        if (isAdmin) {
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
        if (isAdmin) {
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
        if (isAdmin) {
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
        if (isAdmin) {
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
        if (isAdmin) {
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
        if (isAdmin) {

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
        if (isAdmin) {

            if (req.body.detailId && req.body.showId && req.body.detailType) {
                const detailId = req.body.detailId;
                const showId = req.body.showId;
                const detailType = req.body.detailType;

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
                }

                db.ShowDetails.updateOne({ showId: showId }, updateObj)
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            } else {
                res.sendStatus(400);
            }

        } else {
            res.sendStatus(404);
        }
    });

};