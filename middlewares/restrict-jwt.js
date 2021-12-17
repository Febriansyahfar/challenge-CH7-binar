const passport = require("../lib/passport-jwt");
module.exports = passport.authenticate("jwt", {
  session: false,
});
