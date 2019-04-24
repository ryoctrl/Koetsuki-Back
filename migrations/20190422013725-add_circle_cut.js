'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn('circles', 'circleCut', {
            type: Sequelize.STRING
        });
    },
    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('circles', 'circleCut');
    }
};
