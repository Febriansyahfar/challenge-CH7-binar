var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const methodOverride = require("method-override");

var app = express();
const session = require("express-session");
const flash = require("express-flash");

// passport js
const passport = require("./lib/passport.js");
const passport_jwt = require("./lib/passport-jwt.js");

// admin router
const adminRouter = require("./routes/admin");

// api router
const apiRouter = require("./routes/api");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/sb-admin-2", express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2")));
app.use(methodOverride("_method"));

// express-session
app.use(
  session({
    secret: "asd",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// passport handler
app.use(passport_jwt.initialize());
app.use(passport.initialize());
app.use(passport.session());

// express-flash
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// router handler
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
