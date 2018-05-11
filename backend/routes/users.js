var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");


router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  const user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save((err, user) => {
    if (err) { 
      return next(err);
     }
    res.json({ token: user.generateJWT() });
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      return next(err); 
    }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function (req, res, next) {
  User.find({ username: req.body.username },
    function (err, result) {
      if (err) {
        return next(err);
      }
      if (result.length) {
        res.json({ 'username': 'alreadyexists' })
      } else {
        res.json({ 'username': 'ok' })
      }
    });
});

module.exports = router;
