const ac = require('./authController');
const User = require('../models').user;

module.exports = {
    twitterAuth: async function(token, tokenSecret, profile, done) {
        const twitterId = profile.id;
                
        const q = {
            where: {
                twitterId: twitterId
            }
        };

        let user = await User.findOne(q);

        if(user) {
            return done(null, user);
        }

        const screenName = profile.username;
        const displayName = profile.displayName;

        const newUser = {
            twitterId,
            screenName,
            name: displayName
        };

        if(profile.photos && profile.photos.length > 0) {
            newUser.iconUrl = profile.photos[0].value;
        }


        user = await User.create(newUser).catch(() => null);

        if(!user) return done(null);

        done(null, user);
    },
    userSerialize: async function(user, done) {
        done(null, user);
    },
    userDeserialize: async function(id, done) {
        //console.log('user deserializing');
        //console.log(id);
        done(null, id);
    },
    findOneById: async (id) => {
        const q = {
            where: {
                id
            }
        };
        return await User.findOne(q);
    }
};
