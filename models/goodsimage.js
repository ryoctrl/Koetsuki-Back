'use strict';
module.exports = (sequelize, DataTypes) => {
  const goodsImage = sequelize.define('goodsImage', {
    goodId: DataTypes.INTEGER,
    path: DataTypes.STRING
  }, {});
  goodsImage.associate = function(models) {
      goodsImage.belongsTo(models.goods);
  };
  return goodsImage;
};
