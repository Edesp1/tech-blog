const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { User } = require('../../models');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id; // Ensure user ID is stored in the session
      req.session.username = user.username;
      req.session.loggedIn = true;

      console.log('User logged in:', user);
      console.log('Session data:', req.session);

      res.json({ user, loggedIn: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;