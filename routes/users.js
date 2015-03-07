var express = require('express');
var router = express.Router();



/* GET users listing. */
// for a large scale project the limits should be put here as to how much data gets spewed out at one time
// adding paging to your front end.
router.get('/userlist', function(req, res){
    var db = req.db;
    db.collection('userlist').find().toArray(function(err, items){
        res.json(items);
    });
});


/* POST a new user info into db. */
router.post('/adduser', function(req, res){
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
       res.send(
           (err == null) ? { msg: ''} : { msg: err}
       );
    });
});





module.exports = router;
