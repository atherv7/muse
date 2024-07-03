const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, './../.env')});

const secret = process.env.SECRET;
const kid = process.env.API_GATEWAY_KID; 

const generateToken = payload => {
  return jsonwebtoken.sign(payload, secret, {keyid: kid, expiresIn:'1h'});
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) {
    return res.status(401).json({message:'unauthorized'});
  }
  try {
    const decoded = jsonwebtoken.verify(token, secret);
    req.user = decoded;
    next();
  }
  catch(error) {
    res.status(400).json({message:'Invalid Token'});
  }
}

module.exports = { generateToken, verifyToken }; 
