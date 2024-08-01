const bcrypt = require('bcrypt');
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
      console.log('Session after signup:', req.session);
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      console.log('User logged in:', user);
      console.log('Session after login:', req.session);

      res.json({ user, loggedIn: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      console.log('User logged out and session destroyed');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;