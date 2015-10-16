var express = require('express');
var router = express.Router();
var db = require('./../connection');
var Users = db.get('users');
var World = db.get('world');
var sendgrid = require('sendgrid')(process.env.SENDGRID)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Local Llama backend' });
});

router.get('/users', function (req, res, next) {
  Users.find().then(function (data) {
    res.json({status: 'ok', body: data})
  })
})

router.post('/mail', function (req, res, next) {
  sendgrid.send({
    to:       'berto.ort@gmail.com',
    from:     req.body.from,
    subject:  req.body.subject,
    text:     req.body.body
  }, function(err, json) {
    if (err) { return res.json({status: "error", body: err}); }
    res.json(json);
  });
})

module.exports = router;
