var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const authController = require('./controllers/authController');

var indexRouter = require('./routes/index');
const circlesRouter = require('./routes/circles');
const goodsRouter = require('./routes/goods');
const checkRouter = require('./routes/check');
const favoriteRouter = require('./routes/favorites');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'koetuki-app',
    resave: false,
    saveUninitialized: true
}));
authController.initialize(app);

/* allow CORS */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', indexRouter);
app.use('/circles', circlesRouter);
app.use('/goods', goodsRouter);
app.use('/check', checkRouter);
app.use('/favorites', favoriteRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err. status || 500);
    res.json(res.locals);
});

module.exports = app;
