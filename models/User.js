var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;