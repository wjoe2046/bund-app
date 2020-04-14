const User = require('../models/userModels');
const jwt = require('jsonwebtoken'); //generating sign-in token
const expressJWT = require('express-jwt');

const { errorHandler } = require('../helpers/dbErrorHandler');
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: 'User with that email does not exist. Please signup',
      });
    }
    //authenticate the user if the user is found
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'email and password dont match',
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token
    res.cookie('t', token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'signout success' });
};

exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin credential required!',
    });
  }
  next();
};
