var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ApproveDetailsSchema = new Schema({
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show'
    },
    flyer: {
        flyerImg: {
            type: String
        }, 
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    setList: {
        songs: [String],
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    audio: {
        link: String,
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    video: {
        link: String,
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    review: {
        link: String,
        contributed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    submittedOn: {
        type: Date
    },
});

// This creates our model from the above schema, using mongoose's model method
var ApproveDetails = mongoose.model("ApproveDetails", ApproveDetailsSchema);

// Export the Article model
module.exports = ApproveDetails;