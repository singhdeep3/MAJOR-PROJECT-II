const User = require("../models/userModels");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const userRegister = await User.register(newUser, password);
    req.login(userRegister, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "WELCOME!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back cheif!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((error) => {
    if (error) {
      next(error);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
