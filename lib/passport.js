const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("../models");

async function authenticate(username, password, done) {
  try {
    const user = await User.authenticate({ username, password });
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
}
passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    authenticate
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => done(null, await User.findByPk(id)));

module.exports = passport;
