'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: DataTypes.STRING,
        twitterId: DataTypes.STRING,
        screenName: DataTypes.STRING,
        iconUrl: DataTypes.STRING
    }, {});
    user.associate = function(models) {
        user.hasMany(models.favorite, { foreignKey: 'userId' } );
    };
    return user;
};
