'use strict';

module.exports = {
  /* eslint-disable no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    const existedPerms = await sequelize.query(
      'SELECT * FROM permissions',
      { type: sequelize.QueryTypes.SELECT }
    );

    const permIds = existedPerms.map((existedPerm) => {
      return existedPerm.id;
    });

    if (permIds && permIds?.length) {
      const existedRolePerms = await sequelize.query(
        'SELECT * FROM role_permissions WHERE role_name=\'admin\' AND permission_id=:permId',
        { replacements: { permId: Number(permIds[0]) }, type: sequelize.QueryTypes.SELECT }
      );

      // create
      if (!existedRolePerms || existedRolePerms.length === 0) {
        const nowDate = new Date();

        const rolePerms = permIds.map((permId) => {
          return {
            created_at: nowDate,
            updated_at: nowDate,
            role_name: 'admin',
            permission_id: Number(permId),
          };
        });

        return queryInterface.bulkInsert('role_permissions', rolePerms);
      }
    }

    return null;
  },

  /* eslint-disable no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'DELETE FROM role_permissions WHERE role_name IN (\'user\', \'admin\');',
      { type: queryInterface.sequelize.QueryTypes.DELETE },
    );
  }
};
