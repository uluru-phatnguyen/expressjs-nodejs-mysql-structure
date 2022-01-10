/**
 * applyExtraSetup
 *
 * @desc Setup association, ....
 * @param {*} sequelize
 */
function applyExtraSetup(sequelize) {
  const {
    User, Role, RefreshToken, Permission, RolePermission,
  } = sequelize.models;

  /**
   * Role has many users
   */
  Role.hasMany(User, {
    sourceKey: 'name',
    foreignKey: 'roleName',
    as: 'users',
  });

  /**
   * User has one Role
   */
  User.belongsTo(Role, {
    targetKey: 'name', // which references the `name` field from the target model (Role).
    foreignKey: 'roleName', // This creates a foreign key called `role` in the source model (User)
    as: 'role',
  });

  // https://sequelize.org/v6/manual/assocs.html#for--code-belongstomany--code--relationships
  /**
   * Role has many permissions
   */
  Role.belongsToMany(Permission, {
    through: RolePermission,
    as: 'permissions',
    sourceKey: 'name',
  });

  Permission.belongsToMany(Role, {
    through: RolePermission,
    as: 'roles',
    foreignKey: 'permissionId',
  });

  /**
   * User has one Refresh Token
   */
  User.hasOne(RefreshToken, {
    foreignKey: 'userId',
  });

  RefreshToken.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
  });
}

module.exports = {
  applyExtraSetup,
};
