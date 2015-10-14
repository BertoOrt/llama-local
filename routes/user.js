var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');

router.post('/info', function(req, res, next) {
  var id = req.body.id
  var url = req.body.url
  var query = {reference: url}
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
    res.json({status: "ok", body: data})
  })
});

router.post('/package', function(req, res, next) {
  var data = {id: new Date().getTime(), name: req.body.package.name, price: req.body.package.price, about: req.body.package.about}
  Users.update({_id: req.body.id}, {$push: {packages: data} }).then(function (result) {
    res.json({status: "ok", body: result})
  })
});

router.post('/auth', function (req, res, next) {
  var url = req.body.url
  Users.findOne({_id: req.body.cookie}).then(function (data) {
    if (data.reference === url || String(data._id) === url) {
      res.json({status: "ok"})
    } else {
      res.json({status: "error"})
    }
  })
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
      World.findOne({userId: String(data._id)}).then(function (map) {
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

router.post('/url', function (req, res, next) {
  var id = req.body.id;
  var url = req.body.url;
  Users.findOne({reference: url}).then(function (data) {
    if (!data) {
      Users.update({_id: id}, {$set: {reference: url}}).then(function () {
        Users.findOne({_id: id}).then(function (user) {
          res.json({status: "ok", reference: user.reference})
        })
      })
    } else {
      res.json({status: "taken"})
    }
  })
})

router.post('/editPackage', function (req, res, next) {
  Users.update({_id: req.body.id, "packages.id": req.body.package.id}, {$set: {"packages.$.name": req.body.package.name,
    "packages.$.price": req.body.package.price, "packages.$.about": req.body.package.about}}).then(function (data) {
      res.json({status: "ok"})
    })
})

router.post('/removePackage', function (req, res, next) {
  console.log(req.body.package.id);
  Users.update({_id: req.body.id}, {$pull: {packages: {id: req.body.package.id}}}).then(function (data) {
    res.json({status: "ok", body: data})
  })
})

router.post('/addReview', function (req, res, next) {
  console.log(req.body);
  var data = {review: req.body.review, badge: req.body.badge, by: req.body.id}
  Users.findOne({_id: req.body.id}).then(function (by) {
    data.byName = by.name
    Users.findOne({reference: req.body.reference}).then(function (user) {
      if (!user) {
        Users.update({_id: req.body.id}, {$push: {reviews: data}}).then(function (result) {
          res.json({status: "ok", body: result})
        })
      } else {
        Users.update({_id: String(user._id)}, {$push: {reviews: data}}).then(function (result) {
          res.json({status: "ok", body: result})
        })
      }
    })
  })
})

module.exports = router;
