const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If user is logged in call next
    next();
  }
};

const apiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'you must login to perform this action' });
  } else {
    next();
  }
};

const withoutAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { withAuth, apiAuth, withoutAuth };