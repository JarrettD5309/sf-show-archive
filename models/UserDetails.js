var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserDetailsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model('UserDetails', UserDetailsSchema);

// Export the model
module.exports = User;