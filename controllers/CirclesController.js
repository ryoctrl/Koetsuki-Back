const Circle = require('../models').circle;

const create = async function(name, penName, spaceName, twitter, circleCut) {
    return await Circle.create({name, penName, spaceName, twitter, circleCut}).catch(err => {
        return {
            err: true,
            message: err.original.sqlMessage
        };
    });
}

const update = async function(id, name, penName, spaceName, twitter, circleCut) {
    const q = {
        where: {
            id: id
        }
    };
    const obj = {
        name: name,
        penName: penName,
        spaceName: spaceName,
    }
    if(twitter) obj.twitter = twitter;
    if(circleCut) obj.circleCut = circleCut;
    return await Circle.update(obj, q).catch(err => {
        return {
            err: true,
            message: err.original.sqlMessage
        }
    });
}

const getAll = async function() {
    return await Circle.findAll();
}

const findOneById = async function(id) {
    const q = {
        where: {
            id: id
        }
    };
    return await Circle.findOne(q);
}

const findOneBySpaceName = async function(spaceName) {
    const q = {
        where: {
            spaceName: spaceName
        }
    };
    return await Circle.findOne(q);
}


module.exports = {
    getAll,
    create,
    update,
    findOneById, 
    findOneBySpaceName
};
