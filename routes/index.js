var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Local Llama backend' });
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
