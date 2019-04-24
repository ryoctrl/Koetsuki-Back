'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn('users', 'iconUrl', {
            type: Sequelize.STRING,
        });
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('users', 'iconUrl');
    }
};
