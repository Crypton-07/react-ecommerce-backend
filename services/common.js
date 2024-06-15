const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanetizeUser = (user) => {
  return {
    id: user.id,
    role: user.role,
  };
};

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWMyYWI4ZmI3YjJmMDM2MDQyMzU3OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE3ODM0MTQ0fQ.zdU5bcmFRl20bIbdEU959DHuDQvAax-BoPwwNSImCis";
  return token;
};
