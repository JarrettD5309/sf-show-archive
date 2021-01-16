const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var db = require("./models");
const { start } = require('repl');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.mongodburi;
mongoose.connect(MONGODB_URI || 'mongodb://localhost/show-archive',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => console.log("Mongoose is connected")
);

app.get('/api/allstates', (req, res)=>{
    db.Show.distinct('stateCountry')
    .then(result=>res.json(result))
    .catch (err=>res.json(err));
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

    if (endDate==='') {
        dateQuery=startDate;
    } else {
        dateQuery= {
            $gte: startDate,
            $lte: endDate
        }
    }

    let queryObj = {};

    if (dateQuery!=='') {
        queryObj.date = dateQuery;
    }

    if (venue!=='') {
        queryObj.venue = new RegExp(`^.*${venue}.*$`, `i`);
    }

    if (city!=='') {
        queryObj.city = new RegExp(`^.*${city}.*$`, `i`);
    }

    if (stateCountry!=='') {
        queryObj.stateCountry = stateCountry;
    }

    if (allShows) {
        queryObj = {};
    }

    console.log(queryObj);

    db.Show.find(queryObj)
    // .sort('showNum')
    .sort({date: 1})
    .then(result=>res.json(result))
    .catch (err=>res.json(err))
});

app.get('/api/shows/month', (req,res)=>{
    console.log(req.query);

    let currentMonth = req.query.month;
    let currentYear = req.query.year;

    if (currentMonth==='jan') {
        currentMonth='01';
    } else if (currentMonth==='feb') {
        currentMonth='02';
    } else if (currentMonth==='mar') {
        currentMonth='03';
    } else if (currentMonth==='apr') {
        currentMonth='04';
    } else if (currentMonth==='may') {
        currentMonth='05';
    } else if (currentMonth==='jun') {
        currentMonth='06';
    } else if (currentMonth==='jul') {
        currentMonth='07';
    } else if (currentMonth==='aug') {
        currentMonth='08';
    } else if (currentMonth==='sep') {
        currentMonth='09';
    } else if (currentMonth==='oct') {
        currentMonth='10';
    } else if (currentMonth==='nov') {
        currentMonth='11';
    } else if (currentMonth==='dec') {
        currentMonth='12';
    }
    const dateString = `${currentYear}-${currentMonth}`;
    db.Show.find({
        date: {$gte:`${dateString}-01`, $lte:`${dateString}-31`}
    })
    .sort('showNum')
    // .sort({date: 1})
    .then(result=>res.json(result))
    .catch (err=>res.json(err))



});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});