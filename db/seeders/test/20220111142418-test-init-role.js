'use strict';

module.exports = {
  /* eslint-disable no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    const existedRoles = await sequelize.query(
      'SELECT * FROM roles WHERE name IN (\'user\', \'admin\')',
      { type: sequelize.QueryTypes.SELECT }
    );

    // create
    if (!existedRoles || existedRoles.length === 0) {
      return sequelize.query(
        `
          INSERT INTO roles(name, description, created_at, updated_at)
          VALUES
            ('user', 'System User', now(), now()),
            ('admin', 'System Admin', now(), now());
        `,
        { type: sequelize.QueryTypes.INSERT },
      );
    }

    return null;
  },

  /* eslint-disable no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'DELETE FROM roles WHERE name IN (\'user\', \'admin\');',
      { type: queryInterface.sequelize.QueryTypes.DELETE },
    );
  }
};
