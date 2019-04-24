'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    circleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
      favorite.belongsTo(models.circle);
      favorite.belongsTo(models.user);
  };
  return favorite;
};
