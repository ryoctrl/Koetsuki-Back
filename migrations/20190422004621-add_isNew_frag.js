'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return [
            await queryInterface.addColumn('goods', 'isNew', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            })
        ];
    },
    down: async (queryInterface, Sequelize) => {
        return [
            await queryInterface.removeColumn('goods', 'isNew')
        ];
    }
};
