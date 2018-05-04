var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniquevalidator = require('mongoose-unique-validator');

//Create a schema
var User = new Schema;({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email must be unique']
    },
    username: {
        type: String,
        required: [true, 'Please enter an Username'],
        unique: [true, 'Username must be unique']
    },
    first_name: String,
    last_name: String,
    admin: {
        type: boolean,
        default: false
    }
});

User.plugin(uniquevalidator);

module.exports = mongoose.model('User' , User)