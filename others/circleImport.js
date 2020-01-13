const rp = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs');

const options = {
    transform: (body) => {
        return cheerio.load(body);
    }
}

rp.get('http://yukari.blueskywings.net/list.php', options)
    .then(($) => {
        return $('tr');
    })
    .then(trs => {
        const circles = [];
        trs.map(tr => {
            circles.push(trs[tr].children)
        });
        return circles;
    })
    .then(circles => {
        const datas = [];
        let f = false;
        circles.map(circle => {
            if(!f) {
                f = true;
                return;
            }
            const space = circle[1].children[0].data;
            const circleCutTableData = circle[13];
            let src = circleCutTableData.children[1] ? circleCutTableData.children[1].children[1].attribs.src : circleCutTableData.children[0].children[0].attribs.src
            src = 'http://yukari.blueskywings.net' + src.slice(1);
            datas.push({
                space: space,
                src: src
            });
        });
        return datas;
    })
    .then(datas => {
        fs.writeFileSync('./circleCuts.json', JSON.stringify(datas));
    })
    .catch(err => {
        console.error(err);
    });
