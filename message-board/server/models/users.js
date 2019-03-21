'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users'
  });
  Users.associate = function(models) {
    // associations can be defined here
    // hasMany : 一对多的关系，一个user对应多个content
    Users.hasMany(models.Contents, {
      foreignKey: 'user_id'
    })

    Users.hasMany(models.Comments, {
      foreignKey: 'user_id'
    })
  };
  return Users;
};