'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
        INSERT INTO permissions(perm_name, perm_description, created_at, updated_at)
        VALUES
          ('user_add', 'Add User', now(), now()),
          ('user_update', 'Update User', now(), now()),
          ('user_get', 'Get User', now(), now()),
          ('user_get_all', 'Get All User', now(), now()),
          ('user_delete', 'Delete User', now(), now()),
          ('role_add', 'Add Role', now(), now()),
          ('role_update', 'Update Role', now(), now()),
          ('role_get', 'Get Role', now(), now()),
          ('role_get_all', 'Get All Role', now(), now()),
          ('role_delete', 'Delete Role', now(), now()),
          ('permissions_add', 'Add Permission', now(), now()),
          ('permissions_update', 'Update Permission', now(), now()),
          ('permissions_get', 'Get Permission', now(), now()),
          ('permissions_get_all', 'Get All Permission', now(), now()),
          ('permissions_delete', 'Delete Permission', now(), now());
      `,
      { type: queryInterface.sequelize.QueryTypes.INSERT },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('permissions', null, {});
  }
};
