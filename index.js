
var email 	= require("emailjs/email");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

var server 	= email.server.connect({
      user:	"", 
      password:"", 
      host:	"smtp.gmail.com", 
      ssl:		true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router.get('/sendemail/:orderid/:amount/:buyer', function (request, response) {

      var amt = request.params.amount;
      var orderId = request.params.orderid;
      var buyerEmail = request.params.buyer;
      var textstr = "Thank you for your order. Your order for $" + amt + ' is now confirmed. Order id is: ' + orderId + '. For any questions, comments or feedback feel free to reply back to this email and we will get back to you asap! Have a great day.' ;
      var message	= {
            text:	textstr,
            from:	"FineBites <joerichter11@gmail.com>", 
            to:		"Faeez S<faeez.shaikh@gmail.com>, Steve <srubin140@gmail.com>, <"  + buyerEmail + ">",
            cc:		"Boss <kblitz_11@yahoo.com>",
            subject:	"FineBites Order Confirmation",
            attachment: 
            [
               {data:"<html>"+textstr+"</html>", alternative:true},
         {path:"fruits.png", type:"image/png", headers:{"Content-ID":"<my-image>"}}
            ]
         };
         
         // send the message and get a callback with an error or details of the message that was sent
         server.send(message, function(err, message) { console.log(err || message); });
         

})

app.use(router);
app.listen(3300, function () {
   
      console.log('Server started..Email server connected...');   
})