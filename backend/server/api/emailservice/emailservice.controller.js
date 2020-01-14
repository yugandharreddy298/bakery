'use strict';

var _ = require('lodash');
var Emailservice = require('./emailservice.model');
var nodemailer = require('nodemailer');

function sendEmailNotification(recvEmail,subject,mode,content){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25, // use SSL
    auth: {
      user: 'noreply@backery.in',
      pass: 'Password@123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var HelperOptions = {
    from: '"Bakery" <noreply@bakery.in>',
    to: recvEmail,
    subject: subject,
    // text: "link to accept the invitation:" + config.frontendUrl + "/signupemployee/" + activationkey
  };

  if(mode=='text')
    HelperOptions.text = content;
  else
    HelperOptions.html = content;
  transporter.sendMail(HelperOptions, function (err, info) {
    if (err) { res.json({ "res": "error" }) }
    else { res.json({ "res": "success" }) }
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.sendEmailNotification = sendEmailNotification