'use strict';

module.exports = {
  /* eslint-disable no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    const existedPerms = await sequelize.query(
      'SELECT * FROM permissions WHERE perm_name IN (\'user:add\', \'user:update\', \'user:get\', \'user:get_list\')',
      { type: sequelize.QueryTypes.SELECT }
    );

    // create
    if (!existedPerms || existedPerms.length === 0) {
      return sequelize.query(
        `
          INSERT INTO permissions(perm_name, perm_description, created_at, updated_at)
          VALUES
            ('user:add', 'Add User', now(), now()),
            ('user:update', 'Update User', now(), now()),
            ('user:get', 'Get User', now(), now()),
            ('user:get_list', 'Get List User', now(), now()),
            ('user:delete', 'Delete User', now(), now()),
            ('role:add', 'Add Role', now(), now()),
            ('role:update', 'Update Role', now(), now()),
            ('role:get', 'Get Role', now(), now()),
            ('role:get_list', 'Get List Role', now(), now()),
            ('role:delete', 'Delete Role', now(), now()),
            ('permissions:add', 'Add Permission', now(), now()),
            ('permissions:update', 'Update Permission', now(), now()),
            ('permissions:get', 'Get Permission', now(), now()),
            ('permissions:get_list', 'Get List Permission', now(), now()),
            ('permissions:delete', 'Delete Permission', now(), now());
        `,
        { type: sequelize.QueryTypes.INSERT },
      );
    }

    return null;
  },

  /* eslint-disable no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('permissions', null, {});
  }
};
