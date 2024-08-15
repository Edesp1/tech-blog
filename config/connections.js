const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect: 'mysql',
  logging: (msg) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(msg);
    }
  },
});

module.exports = sequelize;