var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Local Llama backend' });
});

router.post('/users', function (req, res, next) {
  Users.find().then(function (data) {
    res.json({status: 'ok', body: data})
  })
})

module.exports = router;
