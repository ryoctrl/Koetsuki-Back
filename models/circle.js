'use strict';
module.exports = (sequelize, DataTypes) => {
    const circle = sequelize.define('circle', {
        name: DataTypes.STRING,
        penName: DataTypes.STRING,
        spaceName: DataTypes.STRING
    }, {});
    circle.associate = function(models) {
        // associations can be defined here
    };
    return circle;
};
