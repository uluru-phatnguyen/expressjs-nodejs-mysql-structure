'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
        INSERT INTO roles(name, description, created_at, updated_at)
        VALUES
          ('user', 'System User', now(), now()),
          ('admin', 'System Admin', now(), now());
      `,
      { type: queryInterface.sequelize.QueryTypes.INSERT },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `DELETE FROM roles WHERE name IN ('user', 'admin');`,
      { type: queryInterface.sequelize.QueryTypes.DELETE },
    );
  }
};
