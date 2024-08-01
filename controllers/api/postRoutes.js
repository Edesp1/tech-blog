const router = require('express').Router();
const { Post, User } = require('../../models');
const { apiAuth } = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', apiAuth, async (req, res) => {
  const body = req.body;

  try {
    console.log('Creating a new post with data:', body);
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json(err);
  }
});

router.get('/new-post', (req, res) => {
  console.log('LoggedIn Status:', req.session.loggedIn);
  res.render('newPost', { loggedIn: req.session.loggedIn });
});

router.put('/:id', apiAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', apiAuth, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;