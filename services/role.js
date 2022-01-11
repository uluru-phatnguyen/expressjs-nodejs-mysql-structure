const { sequelize } = require('./../db');
const {
  Role,
} = sequelize.models;

async function createRole(data) {
  return await Role.create(data);
}

module.exports = {
  createRole,
};
