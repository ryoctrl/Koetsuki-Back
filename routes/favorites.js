const express = require('express');
const router = express.Router();
const checkLoggedIn = require('../middlewares/loggedIn');
const fc = require('../controllers/favoriteController');
const uc = require('../controllers/userController');

router.post('/create', checkLoggedIn, async (req, res) => {
    const postedUid = req.session.passport.user.id;
    const { uid, cid } = req.body;
    if(Number(postedUid) !== Number(uid)) {
        res.status(403);
        res.json({
            err: true,
            message: 'bad request'
        });
        return;
    }
    res.json(await fc.create(uid, cid));
});

router.post('/delete', checkLoggedIn, async (req, res) => {
    const postedUid = req.session.passport.user.id;
    const id = req.body.id;
    if(id == -1) res.status(500);
    const favorite = await fc.findOneById(id);
    if(!favorite) {
        res.status(404);
        res.json({
            err: true,
            message: 'favorite not found!'
        });
        return;
    }

    if(Number(postedUid) !== Number(favorite.userId)) {
        res.status(403);
        res.json({
            err: true,
            message: 'bad request'
        });
        return;
    }
    const result = await fc.destroy(id);
    res.json({
        favorite: { id: id }
    });
});

router.get('/', checkLoggedIn, async (req, res) => {
    const uid = req.session.passport.user.id;
    const user = await uc.findOneById(uid);

    if(!user) res.json([]);

    const favorites = (await user.getFavorites()).map(f => f.dataValues);
    res.json(favorites);
});

module.exports = router;
