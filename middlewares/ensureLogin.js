//Auth middleware
const ensureLoggedIn = (req, res, next) => {
  console.log("ensureLoggedIn middleware called");
  console.log("sessiondddd   " + req.session.user);
  if (req.session && req.session.user) {
    console.log("User is logged in");
    next();
  } else {
    console.log("User is not logged in. Redirecting to /login");
    res.redirect('/');
  }
};