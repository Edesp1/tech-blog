const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (req.session.loggedIn) {
    next(); // User is logged in, proceed to the next middleware
  } else {
    res.redirect('/login'); // Redirect to login if not logged in
  }
};

const apiAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

const withoutAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { withAuth, apiAuth, withoutAuth };