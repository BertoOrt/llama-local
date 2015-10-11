var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');


router.post('/info', function(req, res, next) {
  var id = req.body.id
  var url = req.body.url
  var query = {reference: url}
  if (id) query = {_id: id}
  Users.findOne(query).then(function (data) {
    if (!data) {
      Users.findOne({_id: url}).then(function (user) {
        if (!user) {
          res.json({status: "error", body: "sorry, nothing found"})
        } else {
          res.json({status: "ok", body: user})
        }
      })
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
  var url = req.body.url
  var query = {reference: url}
  if (id) query = {_id: id}
  Users.findOne(query).then(function (data) {
    if (!data) {
      Users.findOne({_id: url}).then(function (user) {
        World.findOne({userId: String(user._id)}).then(function (world) {
          if (!world) {
            res.json({status: "error", body: "sorry, nothing found"})
          } else {
            res.json({status: "ok", body: world})
          }
        })
      })
    } else {
      World.findOne({userId: data._id}).then(function (map) {
        if (!map) {
          res.json({status: "error", body: "sorry, nothing found"})
        } else {
          res.json({status: "ok", body: map})
        }
      })
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
