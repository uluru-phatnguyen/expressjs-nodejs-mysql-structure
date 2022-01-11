const { NOT_FOUND } = require('http-status');
const { KairosError } = require('./../helpers/error');
const { getRequestPagination } = require('./../utils/index');
const { sequelize, Sequelize } = require('./../db');
const {
  User,
} = sequelize.models;
const { Op } = Sequelize;

async function getUserList(queryParams = {}) {
  const { limit, offset } = getRequestPagination(queryParams);
  const { name = '' } = queryParams;

  let filterQuery = {};
  if (name) {
    filterQuery = {
      ...filterQuery,
      [Op.or]: [
        {
          firstName: {
            [Op.like]: `%${name}%`
          }
        },
        {
          lastName: {
            [Op.like]: `%${name}%`
          }
        }
      ]
    };
  }

  return await User.findAll({
    attributes: {
      exclude: ['password', 'salt'],
    },
    where: filterQuery,
    order: [
      ['createdAt', 'desc']
    ],
    limit: limit,
    offset: offset,
  });
}

async function getUserById(id) {
  return await getUser(id);
}

async function createUser(data) {
  return await User.create(data);
}

async function updateUser(id, data) {
  const user = await getUser(id);

  return await user.update(data);
}

async function deleteUserById(id) {
  const user = await getUser(id);

  await user.destroy();
}

async function getUser(id) {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password', 'salt'],
    }
  });

  if (!user) {
    throw new KairosError(NOT_FOUND, 'User not found.');
  }

  return user;
}

module.exports = {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};
