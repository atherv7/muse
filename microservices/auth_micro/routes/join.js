const router = require('express').Router();
const passport = require('passport');
const jsonwebtoken = require('./../utils/jwt.js');

router.get('/google',
          passport.authenticate('google',{scope:['profile','email']})
);

router.get('/google/callback',
           passport.authenticate('google',{failureRedirect:'/'}),
           (req, res) => {
             const token = jsonwebtoken.generateToken({id:req.user.id});
             res.cookie('jwt',token,{httpOnly:true,secure:true,sameSite:'Strict'});
             res.redirect('____CLIENT_ACCOUNT____');
           }
);

router.get('/logout',
           (req, res)=>{
             req.logout();
             req.clearCookies('jwt');
             req.json({'logged out'});
             req.redirect('___HOME_PAGE___');
           }
);

// test endpoint
router.get('/current-user',
           jsonwebtoken.verifyToken,
           (req, res) => {
             res.json(req.user);
           }
);
