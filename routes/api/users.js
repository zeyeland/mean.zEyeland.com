var express = require('express');
var router = express.Router();
var User = require('../../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.json({   'message': 'it workds'  });
  User.find( {}, function(err, users) {
    if(err){
      return res.json({'success':false , 'error':err});
    }
    
    return res.json({'success':true, 'users':users});
  });
});


//Get a single user
router.get('/:userId' , function(req, res, next){
  var userId = req.params.userId;
  User.findOne({'_id':userId}, function(err, user){
    if(err){
      return res.json({'success':false , 'error':err});
    }

    return res.json({'success':true, 'user':user});
  });
});


/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  User.create(new User({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, user){

    if(err){
      return res.json({
        'success':false,
        'user':req.body, 
        'error':err
      });
    }

    return res.json({'success':true, 'user':user});
  
  });
});

router.put('/', function(req,res,next) {
  //find the record of the user to be updated
  User.findOne({'_id': req.body._id}, function(err,user){

  //return false if the user is not found
  if(err){
    return res.json({success:true, error:err});
  }

  //if the user is found , update the record
  if(user){
    //only update values that were paseed
    //to the endpoint
    let data = req.body;

    if(data.username){
      user.username = data.username;
    }
    if(data.email){
      user.email = data.email;
    }
    if(data.first_name){
      user.first_name = data.first_name;
    }
    if(data.last_name){
      user.last_name = data.last_name;
    }

    user.save(function(err){
        if(err){
          return res.json({success:false, error: err})
        }

        return res.json({success:true, user:user})
    });
  }
  });

});

//delete a user
router.delete('/:userId', function(req,res,next){
  var userId = req.params.userId;
  User.remove({'_id':userId}, function(err, removed){
    if(err){
      return res.json({succes:false,error:err});
    }
    return res.json({succes:true, status:removed});

  });
});

router.post('/register', function(req,res,next){
  var data = req.body;
  User.register(new User({
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    }),
  data.password,
  function(err, user){
    if(err){
      return res.json({
        success: false, 
        user: req.body,
        errors: err
      });
      
    }

    return res.json({
      success: true, 
      user: user
    });
  });
});

module.exports = router;
