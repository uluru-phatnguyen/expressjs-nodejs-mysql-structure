const { NOT_FOUND } = require('http-status');
const { KairosError } = require('./../helpers/error');
const { getRequestPagination } = require('./../utils/index');
const { sequelize } = require('./../db');
const {
  Permission,
} = sequelize.models;

async function getPermissionList(queryParams = {}) {
  const { limit, offset } = getRequestPagination(queryParams);

  return await Permission.findAll({
    // where: {},
    order: [
      ['createdAt', 'desc']
    ],
    limit: limit,
    offset: offset,
  });
}

async function getPermissionById(id) {
  return await getPermission(id);
}

async function createPermission(data) {
  return await Permission.create(data);
}

async function updatePermission(id, data) {
  const permission = await getPermission(id);

  return await permission.save(data);
}

async function deletePermissionById(id) {
  const permission = await getPermission(id);

  return await permission.destroy();
}

async function getPermission(id) {
  const permission = await Permission.findByPk(id);

  if (!permission) {
    throw new KairosError(NOT_FOUND, 'Permission not found.');
  }

  return permission;
}

module.exports = {
  getPermissionList,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermissionById,
};
