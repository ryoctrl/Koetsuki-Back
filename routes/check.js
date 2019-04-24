const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
    const session = req.session;
    if(!session) {
        res.status(403);
        res.json({
            message: 'Not authed'
        });
        return;
    }

    const passport = req.session.passport;
    if(!passport) {
        res.status(403);
        res.json({
            message: 'Not authed'
        });
        return;
    }

    const user = passport.user;
    if(!user) {
        res.status(403);
        res.json({
            message: 'Not authed'
        });
        return;
    }

    res.status(200);
    res.json({
        message: 'Authed',
        user: user
    });
    return;
});

module.exports = router;
