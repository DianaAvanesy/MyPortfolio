var express = require('express');
const app = require('../app');
var router = express.Router();

const nodemailer = require("nodemailer");

async function sendFormSubmission(options) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "diana-jstest-01@outlook.com",
      pass: "j883Kf@Rmr4g!"
    }
  });

  // Waiting for the Promise and returning it to the calling function
  return await transporter.sendMail(options);
}

/* Home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: ''
  });
});

/* About me page. */
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About me'
  });
});

/* Projects page. */
router.get('/projects', function (req, res, next) {
  res.render('projects', {
    title: 'My projects'
  });
});

/* Contact me page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Contact me'
  });
});

router.post('/send', function (req, res, next) {
  //console.log('User submitted some info:');
  //console.log(req.body);

  var emailText = 
    "\n Somebody tried contacting you:" +
    "\n Name : " + req.body.name
    + "\n Email : " + req.body.email
    + "\n Message : " + req.body.message

  const options = {
    from: '"Diana Avanesian" <diana-jstest-01@outlook.com>', // sender address
    to: "diana-jstest-01@outlook.com", // list of receivers
    subject: "Contact form submission", // Subject line
    text: emailText, // plain text body
  }

  // Wait for the Promise to resolved and the render the "send" page
  // showing the appropriate completion status
  sendFormSubmission(options).then(() => {
    res.render('send', {
      title: "Email sent successfully!"
    });
  }).catch(() => {
    res.render('send', {
      title: "There was an error sending email. Please resumbit."
    });
  });
});

module.exports = router;