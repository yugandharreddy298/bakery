'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Otp = require('../otp/otp.model');
var EmailService = require('../emailservice/emailservice.controller')
var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log(req.body)
  var newUser = new User(req.body);  
  newUser.save(function(err, user) {
    if (err){console.log(err); return validationError(res, err);}
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 60 * 5 });
    res.json({ token: token ,role:user.role,mobilenumber:user.mobilenumber,email:user.email});
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  console.log(req.params)
  var userId = req.params.id;
  var type=req.params.type
if(type=='email'){
  User.findOne({email:userId}, function (err, user) {
    if (err){ console.log(err); return next(err);}
    if (!user) return res.status(404).send('Not found');
    res.json(user);
  });
}else{
  User.findOne({mobilenumber:userId}, function (err, user) {
    if (err){ console.log(err); return next(err);}
    if (!user) return res.status(404).send('Not found');
    res.json(user);
  }); 
}
};

// For sending an otp to the email
  exports.sendOtp = function(req, res) {
    // if (req.headers && req.headers.ipaddress) {
    //     req.body.IpAddress = req.headers.ipaddress
    // } else {
    //     req.body.IpAddress = req.body.IpAddress
    // }
    const email = req.params.email;
    User.findOne({ email: email }, function(err, user) {
        if (!user) return res.status(200).json({ "res": "notFound" });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25, // use SSL
            auth: {
                user: 'noreply@gmail.in',
                pass: 'Password1234*'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var gen = rn.generator({
            min: 100000,
            max: 999999,
            integer: true
        })
        var otpttl = moment().add(120, 'seconds').format('ddd, MMM D, YYYY hh:mm:ss A')
        const otp = gen();
        var data = {};
        // data.IP = req.body.IpAddress;
        data.otp = otp;
        data.email = email;
        data.expire_at = otpttl
        OtpModel.create(data);
        var HelperOptions = {
            from: '"Bakery" <noreply@gmail.in>',
            to: email,
            subject: " Bakery Password Reset OTP ",
        };
        HelperOptions.html = '<div class="background" style= "width: 680px; height: 718px; background-color: #F4F7FA; text-align: center; margin: auto;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">' +
            '<h2 style="padding-top: 1rem;"> Password Reset OTP</h2>' +
            '<div class="innrbackground"  style=" width: 580px; height: 535px; background-color: #FFF; text-align: center; margin: auto; margin-top: 2rem;">' +
            '<img src ="https://staging.bakery.com/assets/images/otp.png" style="margin-top: 2rem;" >' +
            '<h2 style="margin-top: 2rem;  font-size:18px; font-weight: 500">Enter the OTP to Reset your Bakery Account  Password</h2>' +
            '<p>' + email + '</p>' +
            '<p style="font-size:1.5rem; margin: 65px; margin-top: 17px; margin-bottom: 18px; font-weight: 400;background-color:#d8d0d0;">Your One Time Password is  ' + otp + '</p>' +
            '<h6 style="font-size:1rem;"> Do not share this OTP  to anyone for security reasons</h6>' +
            '<p style="font-size:13px; margin: 65px; margin-top: 14px; margin-bottom: 18px; color: #000; margin-top:2rem"><span style="color:#EA5455;font-size: 17px;">Note:</span>This OTP is valid for the 2 Mins only. If you did not make this request please' +
            '  write at support@bakery.com  </p>' +
            '</div>' +
            '<p style="font-size: 14px;color: #A2A2A3; margin-top: 50px;"><img src ="https://staging.bakery.com/assets/images/careof.png">&nbsp;&nbsp; Doc Intact 2019</p>' +
            '</div>'
        transporter.sendMail(HelperOptions, function(err, info) {
            if (err) {
                res.status(500).json({ "res": "Server error" })
            } else {
                res.status(200).json({ "res": "success" })
            }
        });
    });
};



/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

exports.findPincode = function(req,res){
  console.log(req.body)
  User.find({pincode:{$in: req.body.pincodes}},function(err,userDetails){
    console.log(userDetails)
    if(err) { return handleError(res, err); }
    if(!userDetails) { return res.status(404).send('Not Found'); }
    return res.status(200).json(userDetails);
  })
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.status(500).send(err);
}