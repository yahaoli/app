var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var validate = require('./routes/validate');
var sqlQuery = require('./controls/sqlQuery');
var app = express();
global.sql = sqlQuery;
// view engine setup
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));
app.use(session({resave:false,saveUninitialized:false,secret: 'joke1', key: 'joke_key1', cookie: { httpOnly: true,maxAge: 3600000}}));
/*app.use(function (req, res, next) {
    req.session.user_id=1;
    next();
});*/
app.use('/', index);
app.use('/users', users);
app.use('/validate', validate);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.set('env', 'production')
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
