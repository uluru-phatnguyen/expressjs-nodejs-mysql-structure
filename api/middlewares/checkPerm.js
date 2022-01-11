const { FORBIDDEN } = require('http-status');
const { KairosError } = require('./../../helpers/error');
const { sequelize } = require('./../../db');
const {
  Role,
  Permission,
  RolePermission,
} = sequelize.models;

async function checkPermissions(roleName, permName) {
  const role = await Role.findOne({
    attributes: ['name'],
    where: {
      name: roleName,
    },
    include: [
      {
        model: Permission,
        as: 'permissions',
        attributes: ['id', 'permName', 'permDescription'],
        through: {
          model: RolePermission,
          attributes: [],
        },
        where: {
          permName: permName,
        },
        required: true,
      }
    ],
    subQuery: false,
  });

  if (!role) {
    throw new KairosError(FORBIDDEN, 'Permission denied.');
  }

  return role;
}

module.exports = {
  checkPermissions,
};
