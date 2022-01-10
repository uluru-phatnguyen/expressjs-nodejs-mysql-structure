const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permDescription: {
      type: DataTypes.STRING,
      allowNull: false,
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
        fields: ['perm_name'],
        where: {
          deleted_at: null,
        }
      }
    ],
  });

  // Association will be setup in ../extra-setup.js
  // Role n:n Permission

  return Permission;
};
