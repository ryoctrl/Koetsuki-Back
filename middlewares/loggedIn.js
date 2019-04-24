module.exports = (req, res, next) => {
    const session = req.session;
    if(!session) {
        res.status(500);
        res.json({
            err: true,
            message: 'Session not activated!'
        });
        return;
    }

    if(!session.passport ||
        !session.passport.user ||
        !session.passport.user.twitterId ||
        !session.passport.user.screenName) {
        res.status(403);
        res.json({
            err: true,
            message: '403 forbidden'
        });
        return;
    }
    next();
}
