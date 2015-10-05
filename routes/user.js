var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');

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

module.exports = router;
