'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('circles', 'circleCut', {
            type: Sequelize.STRING
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('circles', 'circleCut');
    }
};
