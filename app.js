const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const ConnectMongoDBSession = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const cors = require('cors');

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const connectDB = require('./models/atlasConnection'); // Adjust import based on your file structure

dotenv.config();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'admin-assets')));

// Session setup
const sessionStore = new ConnectMongoDBSession({
  uri: process.env.MONGO_URL || 'mongodb://localhost:27017/E-Commerce',
  collection: 'sessions'
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'sessionSecret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 24 * 10 // 10 days
  }
}));

// CORS setup
// app.use(cors({
//   origin: 'https://webdevelopment-3.onrender.com',
//   methods: ['POST', 'GET'],
//   credentials: true
// }));

// Routes setup
app.use('/', userRouter);
app.use('/admin', adminRouter);

// MongoDB connection setup
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Catch 404 and forward to error handler
app.use(function(req, res, next) { 
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
