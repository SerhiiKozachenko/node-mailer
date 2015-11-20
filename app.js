// used modules
var express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

// global vars
var app = express();
var port = process.env.PORT || 1111;
// allowed domains
var whitelist = [
  'https://grievoushead.github.io',
  'http://grievoushead.github.io',
  'http://localhost:4321'
];

// email sending transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// cors
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    console.log('Is origin allowed: ' + originIsWhitelisted);
    callback(null, originIsWhitelisted);
  }
};

// routes
app.get('/', function(req, res, next) {
  res.send('how are you doing?');
  res.end();
});

app.options('/:to', cors(corsOptions));

app.put('/:to', cors(corsOptions), bodyParser.json(), function(req, res) {

  var to = req.params.to;
  var subject = req.body.subject;
  var message = req.body.message;
  var secret = req.get('whereTheQuestionsWhereTheAnswers');

  if (!to || !subject || !message || !secret || secret !== process.env.SECRET) {
    res.status(400);
    console.log('to: ' + to);
    console.log('subject: ' + subject);
    console.log('message: ' + message);
    console.log('secret: ' + secret);
    res.end();
    return;
  }

  var mailOptions = {
      from: 'Hop Hey ✔ <HopHey@gmail.com>',
      to: to,
      subject: subject,
      html: message,
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });

  res.status(200);
  res.end();
});

console.log('express server listenning on port: %d', port);
// start app
app.listen(port);
