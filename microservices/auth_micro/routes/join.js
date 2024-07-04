const router = require('express').Router();
const passport = require('passport');
const jsonwebtoken = require('./../utils/jWt.js');
const database = require('../database/db.js'); 
const path = require('path'); 
require('dotenv').config({path:path.resolve(__dirname, '../.env')});

const recordUser = async userInfo => {
  console.log(userInfo); 
  const present = await database.get()
                                .db(process.env.MONGO_DATABASE)
                                .collection(process.env.MONGO_COLLECTION)
                                .findOne({id:userInfo.sub}); 

  if(present) {
    if(present.username === '__no_username__') {
      return [userInfo.sub, true]; 
    }
    else {
      return [present, false]; 
    }
  }
  else {
    await database.get() 
                  .db(process.env.MONGO_DATABASE)
                  .collection(process.env.MONGO_COLLECTION)
                  .insertOne({
                    id:userInfo.sub, 
                    email: userInfo.email, 
                    username: '__no_username__'
                  }); 
    return [userInfo.sub, true]; 
  }
}

router.get('/google',
          passport.authenticate('google',{scope:['profile','email']})
);

router.get('/google/callback',
           passport.authenticate('google',{
                                            successRedirect:'/auth/join/enter',
                                            failureRedirect:'/auth/join/logout'
                                          })
); 

router.get('/enter', async (request, response) => {
  const [_, newUser] = await recordUser(request.user._json); 
  const token = jsonwebtoken.generateToken({id:request.user.sub}); 
  response.cookie('jwt', token); 
  if(newUser) {
    response.redirect('http://localhost:3000/changeusername'); 
  }
  else {
    response.redirect('http://localhost:3000/museum'); 
  }
});

router.get('/logout',
           (req, res)=>{
             req.logout();
             req.clearCookies('jwt');
             res.json({message: 'logged out'});
             res.redirect('http://localhost:3000/');
           }
);

// test endpoint
router.get('/current-user',
           jsonwebtoken.verifyToken,
           (req, res) => {
             res.json(req.user);
           }
);

module.exports = router; 