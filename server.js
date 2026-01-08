const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const { MongoStore } = require('connect-mongo');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const db = require("./models");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

if (process.env.NODE_ENV === "production") {
    const MONGODB_URI = process.env.mongodburi;
    mongoose.connect(MONGODB_URI || 'mongodb://127.0.0.1/show-archive');
} else {
    mongoose.connect('mongodb://127.0.0.1/show-archive');
}

mongoose.connection.on("connected", () => console.log("Mongoose is connected")
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}));

// SETUP EMAIL
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// EMAIL ADMIN ONCE A DAY (7PM EST) WITH NUMBER OF SUBMISSIONS AWAITING
const rule = new schedule.RecurrenceRule();
rule.hour = 19;
rule.minute = 0;
// rule.second = 30;
rule.tz = 'America/New_York';
const job = schedule.scheduleJob(rule, () => {
    db.ApproveDetails.find()
        .then(res => {
            console.log('working');
            if (res.length > 0) {
                const message = {
                    from: process.env.SENDER_ADDRESS,
                    to: process.env.MY_EMAIL,
                    subject: process.env.MY_EMAIL_SUBJECT,
                    text: 'There is/are ' + res.length + ' submissions.'
                };
                transport.sendMail(message, (err, info) => {
                    if (err) { console.log(err); }
                    else { console.log(info); }
                });
            }
        })
        .catch(err => console.log(err));

});

require('./routes/apiRoutes')(app);
require('./routes/adminRoutes')(app);

// To deliver images in storage
app.get("/uploads/:image", (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/" + req.params.image));
});
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});