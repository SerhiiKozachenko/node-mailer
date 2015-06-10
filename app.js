var express = require('express'),
app = express(),
port = process.env.PORT || 1111;

//app.use(express.static(__dirname + '/'));
console.log('express server listenning on port: %d', port);
var nodemailer = require('nodemailer');

app.get('/:to', function(req, res) {
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var to = req.params.to;
  var secret = query.whereTheQuestionsWhereTheAnswers;

console.log('to='+to);
console.log('secret='+secret);
if (!to || !secret || secret !== process.env.SECRET) {
  res.send('by by world');
  return;
}

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Hop Hey ✔ <HopHey@gmail.com>', // sender address
    to: to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
  res.send('world hello');
});

app.listen(port);
