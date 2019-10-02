require("dotenv").config();
var express = require("express");


var db = require("./models");
var passport = require("passport");
var app = express();
var PORT = process.env.PORT || 3000;
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')

// salt const


// Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));;
app.use(bodyParser.json());
app.use(cookieSession({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
//serialize
passport.serializeUser(function (user, done) {

  done(null, user.id);

});
// deserialize user 
passport.deserializeUser(function (id, done) {

  db.User.findByPk(id).then(function (user) {

    if (user) {

      done(null, user.get());

    } else {

      done(user.errors, null);

    }

  });

});
// static directory
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
// require('./config/passport.js')(passport, db.User);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;