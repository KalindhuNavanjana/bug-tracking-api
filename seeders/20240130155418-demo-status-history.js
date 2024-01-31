'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('StatusHistories', [
      {
        state: 'Open',
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        state: 'In Progress',
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more status histories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StatusHistories', null, {});
  },
};
