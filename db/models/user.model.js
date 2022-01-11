const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING, /** hash password */
      // allowNull: false,
    },
    salt: {
      type: DataTypes.STRING, /** hash password */
      // allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
      {
        unique: true,
        fields: ['email'],
        where: {
          deleted_at: null,
        }
      }
    ],
    // https://sequelize.org/v6/manual/hooks.html
    hooks: {
      /* eslint-disable no-unused-vars */
      afterCreate: (record, options) => {
        delete record?.password;
        delete record?.salt;
      },
      /* eslint-disable no-unused-vars */
      afterUpdate: (record, options) => {
        delete record?.password;
        delete record?.salt;
      }
    }
  });

  // Association will be setup in ../extra-setup.js
  // User has one role

  return User;
};
