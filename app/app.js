var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressNunjucks = require('express-nunjucks');
var bodyParser = require('body-parser')

//var indexRouter = require('./routes/musicas')
var indexRouter = require('./routes/index')
var methodOverride = require('method-override');

var session = require('express-session')

require('./models/musics')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/musics', {
  useNewUrlParser: true
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

var njk = expressNunjucks(app);

app.use(session({
  secret: 'teste sessoes',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
