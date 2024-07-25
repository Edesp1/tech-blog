const { User } = require('../models/');
const sequelize = require('../config/connections');

const userdata =
[
  {
    username: "Watermelon123",
    password: "password321"
  },
  {
    username: "Subwaylover2",
    password: "password213"
  },
  {
    username: "grey",
    password: "password123"
  }
];

const seedUsers = async () => {
  try {
    await User.bulkCreate(userdata, {
      individualHooks: true,
      returning: true,
    });
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Failed to seed users:', error);
  }
};

module.exports = seedUsers;