var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniquevalidator = require('mongoose-unique-validator');
//var passportLocalMongoose = require('passport-local-mongoose');
var slug = require('slug');

//Create a schema
var Article = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter an title'],
        unique: [true, 'title is already in use']
    },
    slug: {
        type: String,
        required: [true, 'Please enter an slug'],
        unique: [true, 'Slug must be unique']
    },
    keywords: String,
    description: String,
    body: String,
    published:{
        type: Date,
        default: Date.now,
        //required: [true, 'please enter a pub date']
    },
    created:{
        type: Date,
        default: Date.now
    },
    modified:{
        type: Date,
        default: Date.now
    }
});

Article.pre('save' , function(next){
    this.slug = slug(this.title).toLowerCase();
    next();
});

Article.pre('save' , function(next){
    this.modified = new Date().toISOString();
    next();
});

Article.plugin(uniquevalidator);

module.exports = mongoose.model('Article' , Article);