var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var country = req.body.country;
  var password = req.body.password;
  Users.insert({email: email, country: country, password: password}).then(function (data) {
    res.json({status: "ok", id: data._id})
  })
});

module.exports = router;
