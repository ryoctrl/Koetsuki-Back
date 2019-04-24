const Goods = require('../models').goods;
const GoodsImage = require('../models').goodsImage;

const createGoods = async (obj) => {
    return await Goods.create(obj).catch(err => {
        return {
            err: true,
            error: err
        }
    });
}

const createImage = async (obj) => {
    return await GoodsImage.create(obj).catch(err => {
        return {
            err: true,
            error: err
        }
    });
}

const create = async function(circleId, name, price, image, isNew) {
    const obj = {
        name: name,
        price: price,
        circleId: circleId,
        isNew: isNew,
        createdBy: 1,
    };
    return await Goods.create(obj).catch(err => {
        return {
            err: true,
            error: err
        }
    });
}

const update = async function(id, name, price, image, isNew) {
    const q = {
        where: {
            id: id
        }
    };
    const obj = {
        name: name,
        price: price,
        isNew: isNew
    };

    if(image) {
        const goods = await Goods.findOne(q);
        const imageData = await goods.getGoodsImage();
        if(imageData) {
            await GoodsImage.update({
                path: image,
            }, { where: { id: imageData.id }});
        } else {
            await createImage({path: image, goodId: id});
        }
    }

    return await Goods.update(obj, q).catch(err => {
        return {
            err: true,
            message: err.original.sqlMessage
        }
    });
}


module.exports = {
    createGoods,
    createImage,
    update,
    create
}


