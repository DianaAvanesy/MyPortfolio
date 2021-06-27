var express = require('express');
const app = require('../app');
var router = express.Router();

const nodemailer = require("nodemailer");

//This is the async function that send email based on the options
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


// Regex email validator
// Taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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

/* Send page: POST  */
router.post('/send', function (req, res, next) {

  let name = req.body.name
  let email = req.body.email
  let message = req.body.message

  //Validate that the user provided correct values
  if (!name || !validateEmail(email) || !message) {
    //If not return error message
    res.render('send', {
      title: "Incorrect input. Please correct and resumbit."
    });
  } else {
    //If values correct, format the mbody of the email
    var emailText =
      "\n Somebody tried contacting you:" +
      "\n Name : " + req.body.name +
      "\n Email : " + req.body.email +
      "\n Message : " + req.body.message

    // Sending email from my account to my account to prevent bloking it or marking as spam  
    const options = {
      from: '"Diana Avanesian" <diana-jstest-01@outlook.com>', 
      to: "diana-jstest-01@outlook.com", 
      subject: "Contact form submission", 
      text: emailText,
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
  }


});

module.exports = router;