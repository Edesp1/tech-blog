const Sequelize = require('sequelize');
require('dotenv').config();

// Create connection to our database using DATABASE_URL from Heroku
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: (msg) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(msg);
    }
  },
});