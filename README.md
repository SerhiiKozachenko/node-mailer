# node-mailer
Email service on Node.js

Example of usage:
```
var url = 'https://node-emailer.herokuapp.com/{toEmail}';
      var jsonData = {
        to: 'wbserg@gmail.com',
        subject: 'Hello',
        message: 'Hello World'
        };
      var jsonString = JSON.stringify(jsonData);
      $.ajax({
        url: url,
        method: 'PUT',
        contentType: 'application/json',
        crossDomain: true,
        processdata: true,
        data: jsonString,
        headers: {
          whereTheQuestionsWhereTheAnswers: 'Secret'
        },
        success: function(res) {
          console.log('Oh Yesss! Message sent successfully!');
        },
        error: function(err) {
          console.log('Crap! We have a problem!');
        }
      });
```
