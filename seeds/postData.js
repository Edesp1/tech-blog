const { Post } = require('../models');

const postdata =
[
  {
    postTitle: "Watermelons",
    postContent: "I love Watermelons",
    userId: 1
  },
  {
    postTitle: "Subway",
    postContent: "What are your guys favorite subway sandwich ?",
    userId: 2
  },
  {
    postTitle: "colors",
    postContent: "who else loves colors ?",
    userId: 3
  }
];

const seedPosts = async () => {
  try {
    await Post.bulkCreate(postdata);
    console.log('Posts seeded successfully');
  } catch (error) {
    console.error('Failed to seed posts:', error);
  }
};

module.exports = seedPosts;