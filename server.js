const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get('/api', (req, res) => {
    const data = {
        username: 'nacho',
        age: 10
    };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });