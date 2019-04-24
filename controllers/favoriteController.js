const favorite = require('../models').favorite;
const $AND = require('sequelize').Op.and;

const create = async (uid, cid) => {
    const q = {
        where: {
            userId: uid,
            circleId: cid
        }
    };
    const faved = await favorite.findOne(q);

    if(faved) {
        console.log('already faved');
        console.log(faved);
        return faved;
    }


    const obj = {
        userId: uid,
        circleId: cid
    };

    return await favorite.create(obj).catch(err => {
        return {
            err: true,
            error: err,
        }
    });

    /*
    if(fav.err) {
        console.log('create fav errored!');
        console.log(fav);
        return fav;
    }

    fav = fav.dataValues;
    fav.circleId = cid;
    fav.userId = uid;
    console.log('fav created!');
    console.log(fav);
    return fav;
    */
};

const destroy = async (id) => {
    const q = {
        where: {
            id: id
        }
    };

    const favorited = await favorite.findOne(q);
    if(favorited) return await favorite.destroy(q);
    return {
        err: true,
        error: 'record is not exists'
    }
};

const findOneById = async (id) => {
    const q = {
        where: {
            id: id
        }
    };

    return await favorite.findOne(q);
}

module.exports = {
    create,
    destroy,
    findOneById
}

