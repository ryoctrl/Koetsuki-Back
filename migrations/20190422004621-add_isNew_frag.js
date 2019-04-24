'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn('goods', 'isNew', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            })
        ];
    },
    down: (queryInterface, Sequelize) => {
        return [
            queryInterface.removeColumn('goods', 'isNew')
        ];
    }
};
