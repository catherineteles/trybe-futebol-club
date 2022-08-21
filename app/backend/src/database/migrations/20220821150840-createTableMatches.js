'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      homeTeam: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      awayTeam: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
}
