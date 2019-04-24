const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const uc = require('./userController');

module.exports = { 
    initialize: function(app) {
        this.app = app;
        this.authSettings = JSON.parse(process.env.AUTH);

        app.use(passport.initialize());
        app.use(passport.session());
        passport.serializeUser(uc.userSerialize);
        passport.deserializeUser(uc.userDeserialize);

        this.twitterActivate();
    },
    twitterActivate: function() {
        if(!this.authSettings.twitter.active) {
            console.log('Twitter Auth is not activated');
            return;
        }
        let consumerKey = this.authSettings.twitter.CONSUMER_KEY;
        let consumerSecret = this.authSettings.twitter.CONSUMER_SECRET;
        let callbackURL = process.env.USE_SSL ? 'https' : 'http';
        callbackURL += '://';
        callbackURL += process.env.HOST_NAME;
        callbackURL += callbackURL.endsWith('/') ? '' : '/';
        callbackURL += 'auth/twitter/callback';
        passport.use(new TwitterStrategy({
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            callbackURL: callbackURL
        }, uc.twitterAuth));

        this.app.get('/auth/twitter', passport.authenticate('twitter'));
        this.app.get('/auth/twitter/callback', passport.authenticate('twitter'), async function(req, res) {
            const user = req.session.passport.user;
            res.redirect('/circles');
        });
        console.log('Twitter Auth is activated');
    },
}
