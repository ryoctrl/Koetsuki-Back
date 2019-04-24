const express = require('express');
const router = express.Router();
const checkLoggedIn = require('../middlewares/loggedIn');
const multer = require('multer');
const multerSettings = {
    dest: './public/images'
};
const upload = multer(multerSettings);

const gc = require('../controllers/GoodsController');

router.post('/create', [checkLoggedIn, upload.single('image')], async (req, res) => {
    const user = req.session.passport.user;
    const body = req.body;
    const circleId = body.circleId;
    const name = body.name;
    const isNew = body.isNew === 'true';
    const price = body.price;

    const newGoodsObj = {
        name,
        price,
        circleId,
        isNew,
        createdBy: user.id
    };

    const goods = await gc.createGoods(newGoodsObj);

    if(goods.err) {
        res.status(500);
        res.json(goods);
        return;
    }

    const file = req.file;
    if(!file) {
        res.status(200);
        const goodsObj = goods.dataValues;
        goodsObj.image = false;
        res.json(goodsObj);
        return;
    }

    const path = file.filename;

    const newImageObj = {
        goodId: goods.id,
        path: path
    }

    const goodsImage = await gc.createImage(newImageObj);

    if(goodsImage.err) {
        res.status(500);
        const goodsObj = goods.dataValues;
        goodsObj.image = goodsImage;
        res.json(goodsObj);
        return;
    }

    const goodsObj = goods.dataValues;
    goodsObj.image = goodsImage.dataValues;

    res.status(200);
    res.json(goodsObj);
});

router.post('/update', [/*checkLoggedIn,*/ upload.single('image')], async (req, res) => {
    const body = req.body;
    const id = body.goodsId;
    const name = body.name;
    const price = body.price;
    const isNew = body.isNew === 'true';
    const file = req.file;
    let image = null;
    if(file) image = file.filename;
    console.log('updating!');
    console.log(image);
    const result = await gc.update(id, name, price, image, isNew);
    res.json(result);
});


module.exports = router;
