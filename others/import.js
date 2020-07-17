const fs = require('fs');
const path = require('path');
const files = [
    'voiconne_circles.json',
]
const cc = require('../controllers/CirclesController');
const gc = require('../controllers/GoodsController');

// circle create => function(name, penName, spaceName, twitter, circleCut)
// cricle update = async function(id, name, penName, spaceName, twitter, circleCut) 
// goods create => async function(circleId, name, price, image, isNew)
// goods update = async function(id, name, price, image, isNew)
const process = async (circles) => {
    console.log('begin loading => ', circles.length);
    for(const circle of circles) {
        let circleObj = await cc.findOneBySpaceName(circle.spaceName);
        /*
        let registeredGoods = [];
        const registered = circleObj.twitter;
        if(!circleObj) continue;
        if(registered && registered.length > 1 && registered.startsWith('http')) {
            continue;
        }

        const exp = circle.twitter.match(/\/\/twitter.com\/(.*)$/);

        if(exp === null || exp.length < 2) {
            console.log(circle.space);
            console.log(circle.twitter);
            continue;
        }

        const twitter = exp[1];
        await cc.updateTwitter(circleObj.id, twitter);
        */
        if(circleObj) {
            circleObj = await cc.update(circleObj.id, circle.name, circle.penName, circle.spaceName, circle.twitter || '', null);
        } else {
            circleObj = await cc.create(circle.name, circle.penName, circle.spaceName, circle.twitter || '' , null);
        }

        for(const goods of circle.goods || []) {
            if(!goods.isNew) goods.isNew = false;
            if(goods.isNew === '新') goods.isNew = true;
            if(!goods.price) goods.price = -1;
            if(Number.isNaN(Number(goods.price))) goods.price = -1;
            let goodsObj = registeredGoods.shift();
            if(goodsObj) {
                goodsObj = await gc.update(goodsObj.id, goods.name, goods.price, null, goods.isNew);
            } else {
                goodsObj = await gc.create(circleObj.id, goods.name, goods.price, null, goods.isNew);
            }
        }
    }
}

const start = async () => {
    for(let file of files) {
        file = path.join(__dirname, file);
        const circles = JSON.parse(fs.readFileSync(file));
        await process(circles);
    }
};

start();

