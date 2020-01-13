const path = require('path');
const circleCuts = require('./circleCuts.json');
const cc = require('../controllers/CirclesController');
const gc = require('../controllers/GoodsController');

// circle create => function(name, penName, spaceName, twitter, circleCut)
// cricle update = async function(id, name, penName, spaceName, twitter, circleCut) 
// goods create => async function(circleId, name, price, image, isNew)
// goods update = async function(id, name, price, image, isNew)
const process = async () => {
    let procCount = 0, circleNFCount = 0, circleSettedCount = 0;
    let nfcircles = [];
    for(const circleCut of circleCuts) {
        const space = circleCut.space;
        const circle = await cc.findOneBySpaceName(space);
        if(!circle) {
            console.log('circle Not found!');
            console.log(space);
            nfcircles.push(circleCut);
            circleNFCount++;
            continue;
        }

        if(circle.circleCut) {
            console.log('circle cut is already setted!');
            circleSettedCount++;
            continue;
        }

        await cc.update(circle.id, circle.name, circle.penName, circle.spaceName, circle.twitter, circleCut.src);
        procCount++;
    }

    console.log('Process completed!');
    console.log('Process count', procCount);
    console.log('Circle not found', circleNFCount);
    console.log(nfcircles);
    console.log(circleSettedCount, 'circles already image setted');
}
    /*
const process = async (circles) => {
    for(const circle of circles) {
        let circleObj = await cc.findOneBySpaceName(circle.spaceName);
        let registeredGoods = [];
        if(circleObj) {
            circleObj = await cc.update(circleObj.id, circle.name, circle.penName, circle.spaceName, circle.twitter, null);
        } else {
            circleObj = await cc.create(circle.name, circle.penName, circle.spaceName, circle.twitter, null);
        }

        for(const goods of circle.goods) {
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
*/

process();
