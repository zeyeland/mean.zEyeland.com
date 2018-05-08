var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users')


router.get('/', function(req,res,next){
  //console.log(req.session);
  res.render('users/index', {title: 'User Management'});
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('users/register', { title: 'Create an Account' });
});


router.get('/login' , function(req, res, next){
  res.render('users/login');
});

router.post('/login', passport.authenticate('local'), function(req, res, next){
  res.redirect('/users');
});

router.get('/logout', function(req,res,next){
  req.logOut();
  res.redirect('/users/login');
})

module.exports = router;
