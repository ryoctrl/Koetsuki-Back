const express = require('express');
const router = express.Router();
const circlesController = require('../controllers/CirclesController');
const multer = require('multer');
const upload = multer(JSON.parse(process.env.MULTER_SETTINGS));
const checkLoggedIn = require('../middlewares/loggedIn');

router.get('/', async (req, res) => {
    const circleObjects = await circlesController.getAll();
    const circles = [];

    for(const circleObj of circleObjects) {
        const goodsObjects = await circleObj.getGoods();
        let goods = [];
        for(const goodsObj of goodsObjects) {
            const good = goodsObj.dataValues;
            const imageObj = await goodsObj.getGoodsImage();
            if(imageObj) good.image = imageObj.dataValues;
            else good.image = false;
            goods.push(good);
        }
        const circle = circleObj.dataValues;
        circle.goods = goods;
        circles.push(circle);
    }
    res.json(circles);
});

/*
router.post('/create', [checkedLoggedIn, upload.single('image')], async (req, res) => {
    const body = req.body;
    const spaceName = body.spaceName;
    const name = body.name;
    const penName = body.penName;
    const twitter = body.twitter;
    const file = req.file;
    let path = null;
    if(file) path = file.filename;

    const result = await circlesController.create(name, penName, spaceName, twitter, path);
    if(result.err) res.status(500);

    res.json(result);
});
*/


router.post('/update', [checkLoggedIn, upload.single('image')], async (req, res) => {
    const body = req.body;
    const spaceName = body.spaceName;
    const name = body.name;
    const penName = body.penName;
    const twitter = body.twitter;
    const circleId = body.circleId;
    const file = req.file;
    let path = null;
    if(file) path = file.filename;
    
    const result = await circlesController.update(circleId, name, penName, spaceName, twitter, path);
    if(result.err) res.status(500);
    res.json(result);
});




module.exports = router;
