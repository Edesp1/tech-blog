const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "Watermelons",
    "postContent": "I love Watermelons",
    "userId": 1
  },
  {
    "postTitle": "Subway",
    "postContent": "What are your guys favorite subway sandwich ?",
    "userId": 2
  },
  {
    "postTitle": "",
    "postContent": "",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;