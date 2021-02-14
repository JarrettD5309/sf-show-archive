const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const mime = require('mime-types');

module.exports = app => {

    const isAdmin = true;

    app.get('/admin/shows', (req, res) => {
        if (isAdmin) {
            const showNum = req.query.showNum;

            const queryObj = {};
            if (showNum) {
                queryObj.showNum = showNum;
            }
            db.Show.find(queryObj)
                .then(result => {
                    db.ShowDetails.findOne({ showId: result[0]._id})
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

};