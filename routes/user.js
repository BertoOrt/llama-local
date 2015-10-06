var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');

router.post('/info', function(req, res, next) {
  var id = req.body.id
  Users.findOne({_id: id}).then(function (data) {
    if (!data) {
      res.json({status: "error", body: "sorry, nothing found"})
    } else {
      console.log(data);
      res.json({status: "ok", body: data})
    }
  })
});

router.post('/world', function(req, res, next) {
  var id = req.body.id
  World.findOne({userId: id}).then(function (data) {
    if (!data) {
      res.json({status: "error", body: "sorry, nothing found"})
    } else {
      console.log(data);
      res.json({status: "ok", body: data})
    }
  })
});

router.post('/update/world', function(req, res, next) {
  var id = req.body.id;
  var country = req.body.country;
  var value = req.body.value;
  var updatedWorld = {userId: id}
  updatedWorld[country] = value
  console.log('info: ', id, country, value);
  World.update({userId: id}, {$set: updatedWorld}, {upsert: true}).then(function (data) {
    console.log('here');
    res.json({status: "ok", body: data})
  })
});

module.exports = router;
