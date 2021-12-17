const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, "asd", (err, user) => {
      if (err) {
        return res.status(403).send({
          message: "Your token is invalid, please login",
        });
      }
      next();
    });
  } else {
    next();
  }
};
