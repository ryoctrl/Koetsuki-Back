'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn('circles', 'twitter', {
            type: Sequelize.STRING,
        });
    },

    down: (queryInterface, Sequelize) => {
        queryIntarface.removeColumn('circles', 'twitter');
    }
};
