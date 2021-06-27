var express = require('express');
const app = require('../app');
var router = express.Router();

/* Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* About me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About me' });
});

/* Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'My projects' });
});

/* Contact me page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact me' });
});



module.exports = router;
