const passport = require('passport');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const database = require('./../database/db.js');

require('dotenv').config({path:path.resolve(__dirname, '../.env')});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/join/google/callback',
  passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
  done(null, profile); 
}
));

passport.serializeUser((user, done)=>{
  done(null, user);
});

passport.deserializeUser((user, done)=>{
  // try {
  //   const user = await database.get()
  //                              .db(process.env.MONGO_DATABASE)
  //                              .collection(process.env.MONGO_COLLECTION)
  //                              .findOne({'id':id});
  //   done(null, user); 
  // }
  // catch(err) {
  //   done(err, null)
  // }
  done(null, user); 
});