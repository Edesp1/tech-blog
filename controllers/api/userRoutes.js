const router = require('express').Router();
const { User } = require('../../models');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      console.log('New user created:', newUser);
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log('No user found with that username');
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('Invalid password');
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      console.log('User logged in:', userData);
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error('Login error:', err);  // Improved error logging
    res.status(500).json({ message: 'Internal server error' });  // Return a more specific error message
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;