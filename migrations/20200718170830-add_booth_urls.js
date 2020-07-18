'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('circles', 'boothUrl', {
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('circles', 'boothUrl');
    }
};
