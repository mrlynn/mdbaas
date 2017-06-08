var express = require('express');
var router = express.Router();
// var csrf = require('csurf');
var passport = require('passport');

// var csrfProtection = csrf();
// router.use(csrfProtection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET users listing. */
router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');
  // res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages});
  res.render('user/signin', {messages: messages, hasErrors: messages});
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { messages: messages, hasErrors:messages});
});

/* Sign up */
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/instances',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

/* Profile */
router.get('/profile', isLoggedIn, function (req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
	// res.render('instances', {
	// 	user: req.user,
	// 	errorMsg: errorMsg,
	// 	noErrorMsg: !errorMsg,
	// 	successMsg: successMsg,
	// 	noMessage: !successMsg
	// });
  res.redirect('/instance');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
