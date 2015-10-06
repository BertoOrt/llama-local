var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');
var passport = require('passport');

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '//localhost:8080/oauthCallback',
  successRedirect: '//localhost:8080/oauthCallback'
}));

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var country = req.body.country;
  var password = bcrypt.hashSync(req.body.password, 8);
  Users.findOne({email: email}).then(function (data) {
    if (!data) {
      Users.insert({email: email, country: country, password: password, headline: "Bienvenidos!",
       about: "I'm a new llama. Click settings to edit info.", language: "English", name: "Llama"}).then(function (data) {
        var id = data._id.toString()
        World.insert({userId: id}).then(function () {
          res.json({status: "ok", id: id})
        })
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
