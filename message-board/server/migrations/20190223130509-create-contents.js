'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      like_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      comment_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    }, {
      tableName: 'contents',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(_ => {
      queryInterface.addIndex('contents', {
        name: 'user_id',
        fields: ['user_id']
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contents');
  }
};