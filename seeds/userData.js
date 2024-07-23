const { User } = require('../models/');
const sequelize = require('../config/connections');

const userdata =
[
  {
    "username": "Watermelon123",
    "password": "password321"
  },
  {
    "username": "Subwaylover2",
    "password": "password213"
  },
  {
    "username": "",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;