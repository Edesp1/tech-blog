const router = require('express').Router();
const { Post, User } = require('../models/');
const { withAuth } = require('../utils/auth');

// ALL POSTS DASHBOARD
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {"userId": req.session.userId},
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('allposts', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('editPost', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;