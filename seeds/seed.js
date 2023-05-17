const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./projectData.json');
const commentData = require('./projectData.json');

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
      postId: users[Math.floor(Math.random() * posts.length)]
    });
  }

  process.exit(0);
};

seedDatabase();
