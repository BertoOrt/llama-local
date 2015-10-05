var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('./../connection');
var Users = db.get('users');
var passport = require('passport');

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '//localhost:8080/',
  successRedirect: '//localhost:8080/'
}));

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var country = req.body.country;
  var password = bcrypt.hashSync(req.body.password, 8);
  Users.findOne({email: email}).then(function (data) {
    if (!data) {
      Users.insert({email: email, country: country, password: password}).then(function (data) {
        res.json({status: "ok", id: data._id})
      });
    } else {
      res.json({status: "error"})
    }
  })
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  Users.findOne({email: email}).then(function (data) {
    if (bcrypt.compareSync(password, data.password)) {
      res.json({status: "ok", id: data._id})
    } else {
      res.json({status: "error"})
    }
  });
});

module.exports = router;
