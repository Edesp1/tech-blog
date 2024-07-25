const sequelize = require('../config/connections');
const seedUsers = require('./userData');
const seedPosts = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');

  await seedUsers();
  console.log('Users seeded');

  await seedPosts();
  console.log('Posts seeded');
  
  process.exit(0);
};

seedAll();