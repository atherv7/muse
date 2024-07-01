const passport = require('passport');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const database = require('./../database/db.js');

require('dotenv').config({path:path.resolve(__dirname, '../.env')});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3010/join/google/callback',
  passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
  // try {
  //   profile = profile._json;
    
  //   let user = await database.get()
  //                            .db(process.env.MONGO_DATABASE)
  //                            .collection(process.env.MONGO_COLLECTION)
  //                            .find({'id':profile.sub});
    
  //   if(!user) {
  //     user = {
  //       'id': profile.sub,
  //       'email': profile.email,
  //       'username': '__nousername'
  //     };

  //     await database.get()
  //                   .db(process.env.MONGO_DATABASE)
  //                   .collection(process.env.MONGO_COLLECTION)
  //                   .insertOne(user);
  //   }
    
  //   done(null, user);
  //   console.log('profile sub: ' + profile.sub);
  // }
  // catch(error) {
  //   console.log('there was an error'); 
  //   done(error, null);
  // }
  done(null, profile._json); 
}
));

passport.serializeUser((user, done)=>{
  done(null, user);
});

passport.deserializeUser(async (id, done)=>{
  try {
    const user = await database.get()
                               .db(process.env.MONGO_DATABASE)
                               .collection(process.env.MONGO_COLLECTION)
                               .findOne({'id':id});
    done(null, user); 
  }
  catch(err) {
    done(err, null)
  } 
});