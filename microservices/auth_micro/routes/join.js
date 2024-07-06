const router = require('express').Router();
const passport = require('passport');
const jsonwebtoken = require('./../utils/jWt.js');
const database = require('../database/db.js'); 
const path = require('path'); 
require('dotenv').config({path:path.resolve(__dirname, '../.env')});

const recordUser = async userInfo => {
  const present = await database.get()
                                .db(process.env.MONGO_DATABASE)
                                .collection(process.env.MONGO_COLLECTION)
                                .findOne({id:userInfo.sub}); 

  if(present) {
    if(present.username === '__no_username__') {
      return true; 
    }
    else {
      return false; 
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
    return true; 
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

router.post('/changeusername', 
            jsonwebtoken.verifyToken,
            async (req, res) => {
              const userInfo = req.user; 
              const username = req.body.username; 
              try {
                console.log(JSON.stringify(userInfo)); 
                console.log(username); 
                await database.get() 
                              .db(process.env.MONGO_DATABASE)
                              .collection(process.env.MONGO_COLLECTION)
                              .updateOne({id: userInfo.id}, 
                                         {$set: {username: username}}, 
                                         (error, _) => {
                                          if (error) throw error; 
                                         }
                                        );
                console.log('username saved'); 
                res.status(200).json({message:'username updated'}); 
                console.log('redirecting to http://localhost:3000/museum...'); 
              }
              catch(error) {
                console.log(error); 
              }
}); 

router.get('/enter', async (request, response) => {
  const userJson = request.user._json; 
  const newUser = await recordUser(userJson); 
  const token = jsonwebtoken.generateToken({id:userJson.sub, 
                                            email: userJson.email
                                          }); 
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