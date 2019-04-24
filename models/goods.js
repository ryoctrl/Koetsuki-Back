'use strict';
module.exports = (sequelize, DataTypes) => {
    const goods = sequelize.define('goods', {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        circleId: DataTypes.INTEGER,
        createdBy: DataTypes.INTEGER,
        isNew: DataTypes.BOOLEAN,
    }, {});
    goods.associate = function(models) {
        goods.belongsTo(models.circle);
        goods.hasOne(models.goodsImage, { foreignKey: 'goodId'});
    };
    return goods;
};
