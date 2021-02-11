var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ResetTokensSchema = new Schema({
    email: {
        type: String
    },
    token: {
        type: String
    },
    expiration: {
        type: Date
    },
    used: {
        type: Number,
        default: 0
    }
});

// This creates our model from the above schema, using mongoose's model method
var ResetTokens = mongoose.model("ResetTokens", ResetTokensSchema);

// Export the ResetTokens model
module.exports = ResetTokens;