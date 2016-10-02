var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var authenticate = require('./authenticate');

var passport = require('passport');
var User = require('./models/user');
var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var availableTemplateRouter = require('./routes/availableTemplateRouter');
var datatypeRouter = require('./routes/datatypeRouter');
var sampleTemplateRouter = require('./routes/sampleTemplateRouter');
var userTemplateRouter = require('./routes/userTemplateRouter');
var userDatabaseRouter = require('./routes/userDatabaseRouter');

var app = express();

// Secure traffic only
//app.all('*', function(req, res, next){
//    console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'));
//  if (req.secure) {
//    return next();
//  };
//
// res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


//app.get('/products/:id', function(req, res, next){
//  res.json({msg: 'This is CORS-enabled for all origins!'});
//});
 
//app.listen(80, function(){
//  console.log('CORS-enabled web server listening on port 80');
//});


// passport config

app.use(passport.initialize());


app.use(express.static(path.join(__dirname, 'public')));

console.log('Web Location' + __dirname);
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/images', express.static(__dirname + '/images'));

app.use('/', routes);
app.use('/users', users);
app.use('/availabletemplates',availableTemplateRouter);
app.use('/datatypes',datatypeRouter);
app.use('/sampletemplates',sampleTemplateRouter);
app.use('/usertemplates',userTemplateRouter);
app.use('/userdatabases',userDatabaseRouter);

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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;