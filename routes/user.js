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
      res.json({status: "ok", body: data})
    }
  })
});

router.post('/editInfo', function(req, res, next) {
  var id = req.body.id
  delete req.body.id;
  Users.update({_id: id}, {$set: req.body }).then(function (data) {
    res.json({status: "ok", body: "data"})
  })
});

router.post('/auth', function (req, res, next) {
  console.log(req.body.id, req.body.cookie);
  res.json({status: "ok"})
})

router.post('/world', function(req, res, next) {
  var id = req.body.id
  World.findOne({userId: id}).then(function (data) {
    if (!data) {
      res.json({status: "error", body: "sorry, nothing found"})
    } else {
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
  World.update({userId: id}, {$set: updatedWorld}, {upsert: true}).then(function (data) {
    res.json({status: "ok", body: data})
  })
});

module.exports = router;
