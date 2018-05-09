var express = require('express');
var router = express.Router();
//var passport = require('passport');
var Article = require('../models/articles')


router.get('/', function(req,res,next){
  //console.log(req.session);
  res.render('articles/index', {title: 'Index Articles page'});
});

router.get('/register', function(req, res, next) {
    res.render('articles/register', { title: 'Create an Post' });
  });



module.exports = router;
