var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var routes = require('./routes/index');
var instances = require('./routes/instances');
var adminRoutes = require('./routes/admin');

var api = require('./routes/api');
var users = require('./routes/users');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcrypt');
const chalk = require('chalk');
const async = require('async');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var app = express();

dotenv.load({
	path: '.env'
});

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoB connection error in app.js Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

require('./config/passport');
var hbs = expressHbs.create({
    helpers: {
        JSON: function(obj) {
          return JSON.stringify(obj,null,2);
        },
        Upper: function(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    defaultLayout: 'layout',
    extname: '.hbs',
});
// view engine setup

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'asupersupersupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/user', users);
app.use('/instances', instances);
app.use('/instance', instances);
app.use('/api', api);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
