var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Article = require('../../models/articles');

router.post('/register', function(req,res,next){
  var data = req.body;
  Article.create(new Article({
    title: data.title,
    slug: data.slug,
    keywords: data.keywords,
    description: data.description,
    body: data.body,
    }),
  function(err, article){
    if(err){
      return res.json({
        success: false, 
        article: req.body,
        errors: err
      });
      
    }

    return res.json({
      success: true, 
      article: article
    });
  });
});

/* GET articles listing. */
router.get('/', function(req, res, next) {
  //res.json({   'message': 'it workds'  });
  Article.find( {}, function(err, articles) {
    if(err){
      return res.json({'success':false , 'error':err});
    }
    
    return res.json({'success':true, 'articles':articles});
  });
});
//Get single article
router.get('/:userId' , function(req, res, next){
  var articleId = req.params.userId;
  Article.findOne({'_id':articleId}, function(err, article){
    if(err){
      return res.json({'success':false , 'error':err});
    }

    return res.json({'success':true, 'article':article});
  });
});


router.put('/', function(req,res,next) {
  //find the record of the user to be updated
  Article.findOne({'_id': req.body._id}, function(err,article){

  //return false if the user is not found
  if(err){
    return res.json({success:true, error:err});
  }

  //if the user is found , update the record
  if(article){
    //only update values that were paseed
    //to the endpoint
    let data = req.body;

    if(data.title){
      article.username = data.title;
    }
    if(data.slug){
      article.email = data.slug;
    }
    if(data.keywords){
      article.first_name = data.keywords;
    }
    if(data.description){
      article.last_name = data.description;
    }
    if(data.body){
      article.last_name = data.body;
    }

    article.save(function(err){
        if(err){
          return res.json({success:false, error: err})
        }

        return res.json({success:true, article:article})
    });
  }
  });
});

router.delete('/:userId', function(req,res,next){
  var articleId = req.params.userId;
  Article.remove({'_id':articleId}, function(err, removed){
    if(err){
      return res.json({succes:false,error:err});
    }
    return res.json({succes:true, status:removed});

  });
});


module.exports = router;
