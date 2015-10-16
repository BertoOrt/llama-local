var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');
var passport = require('passport');

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'public_profile', 'publish_actions', 'email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: 'http://development.llama-local.divshot.io/error'}), function (req, res) {
  Users.findOne({facebookId: req.user.id}).then(function (userData) {
    if (!userData) {
      Users.insert({facebookId: req.user.id, headline: "Bienvenido!", facebookToken: req.user.token,
       about: "I'm a new llama. Click settings to edit info.", language: "English", country: "United States", name: req.user.displayName}).then(function (data) {
        var id = data._id.toString()
        res.cookie('user', id);
        World.insert({userId: id}).then(function () {
          res.redirect('http://development.llama-local.divshot.io/' + id)
        })
      });
    } else {
      res.cookie('user', String(userData._id));
      res.redirect('http://development.llama-local.divshot.io/' + userData._id.toString())
    }
  })
});

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var country = req.body.country;
  var password = bcrypt.hashSync(req.body.password, 8);
  Users.findOne({email: email}).then(function (data) {
    console.log('baby');
    if (!data) {
      console.log('stemps');
      Users.insert({email: email, country: country, password: password, headline: "Bienvenidos!",
       about: "I'm a new llama. Click settings to edit info.", language: "English", name: "Llama"}).then(function (data) {
        var id = data._id.toString()
        World.insert({userId: id}).then(function () {
          res.json({status: "ok", id: id})
        })
      });
    } else {
      console.log(data);
      res.json({status: "error"})
    }
  })
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  Users.findOne({email: email}).then(function (data) {
    if (!data) {
      res.json({status: "error", message: "user not found"})
    } else {
      if (bcrypt.compareSync(password, data.password)) {
        res.json({status: "ok", id: data._id})
      } else {
        res.json({status: "error", message: "incorrect password"})
      }
    }
  });
});

router.get('/logout', function (req, res, next) {
  req.session = null
  res.redirect('http://development.llama-local.divshot.io/')
})

module.exports = router;
