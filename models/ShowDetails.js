var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ShowDetailsSchema = new Schema({
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show'
    },
    flyer: [{
        flyerImg: {
            type: String
        }, 
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    setList: {
        songs: [String],
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    audio: [{
        link: String,
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    video: [{
        link: String,
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    review: [{
        link: String,
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    attendance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

// This creates our model from the above schema, using mongoose's model method
var ShowDetails = mongoose.model("ShowDetails", ShowDetailsSchema);

// Export the Article model
module.exports = ShowDetails;