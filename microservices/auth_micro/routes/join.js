const router = require('express').Router();
const passport = require('passport');
const jsonwebtoken = require('./../utils/jWt.js');

router.get('/google',
          passport.authenticate('google',{scope:['profile','email']})
);

router.get('/google/callback',
           passport.authenticate('google',{
                                            // successRedirect: '/join/enter', 
                                            failureRedirect:'/'
                                          }),
            (req, res) => {
              const token = jsonwebtoken.generateToken({id:req.user['sub']});
              res.cookie('jwt',token);//,{httpOnly:true,secure:true,sameSite:'Strict'});
              res.redirect('http://localhost:3000/museum');
           }
);

router.get('/enter', (req, res) => {
  res.json({message: 'welcome'}); 
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