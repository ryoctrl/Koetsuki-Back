'use strict';
module.exports = (sequelize, DataTypes) => {
    const circle = sequelize.define('circle', {
        name: DataTypes.STRING,
        penName: DataTypes.STRING,
        spaceName: DataTypes.STRING,
        twitter: DataTypes.STRING,
        circleCut: DataTypes.STRING,
        boothUrl: DataTypes.STRING,
    }, {});
    circle.associate = function(models) {
        circle.hasMany(models.goods, { foreignKey: 'circleId'});
    };
    return circle;
};
