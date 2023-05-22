const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let posts = [1, 2, 3]

  for (const post of postData) {
    await post.create({
      ...post,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await comment.create({
      ...comment,
      userId: users[Math.floor(Math.random() * users.length)].id,
      postId: posts[Math.floor(Math.random() * users.length)],
    });
  }

  process.exit(0);
};

seedDatabase();
