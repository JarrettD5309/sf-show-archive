var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ShowSchema = new Schema({
    showNum: {
        type: Number
    },
    date: {
        type: String,
        lastActiveAt: Date
    },
    venue: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    stateCountry: {
        type: String
    }
});

// This creates our model from the above schema, using mongoose's model method
var Show = mongoose.model("Show", ShowSchema);

// Export the Article model
module.exports = Show;