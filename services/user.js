const { sequelize } = require('./../db');
const {
  User,
} = sequelize.models;

async function getAll () {
  return await User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function update(id, params) {
  const user = await getUser(id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();
}

async function deleteById(id) {
  const user = await getUser(id);

  await user.destroy();
}

async function getUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

module.exports = {
  getAll,
  getById,
  update,
  deleteById,
};
