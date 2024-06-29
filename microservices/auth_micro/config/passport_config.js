const passport = require('passport');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const database = require('./../database/db.js');

require('dotenv').config({path:path.resolve(__dirname, '../.env')});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/join/google/callback',
  passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
  try {
    let user = await database.get()
                             .db(process.env.MONGO_DATABASE)
                             .collection(process.env.MONGO_COLLECTION)
                             .find({'id':profile.id});
    if(!user) {
      user = {
        'id': profile.id,
        'email': profile.email,
        'username': '__nousername'
      };

      await database.get()
                    .db(process.env.MONGO_DATABASE)
                    .collection(process.env.MONGO_COLLECTION)
                    .insertOne({user});
    }

    done(null, user);
  }
  catch(error) {
    done(error, null);
  }
}
));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  try {
    const user = database.get()
                         .db(process.env.MONGO_DATABASE)
                         .collection(process.env.MONGO_COLLECTION)
                         .findOne({'_id':id});
    done(null, user); 
  }
  catch(err) {
    done(err, null)
  } 
});