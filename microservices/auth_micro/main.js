const express = require('express');
const passport = require('passport');
const session = require('express-session');
const database = require('./database/db.js');

require('dotenv').config();
require('./config/passport_config.js');

const app = express();
const portNumber = process.env.PORT_NUMBER;

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
  secret: process.env.SECRET
  // ,resave: false,
  // saveUninitialized: true,
  // cookie: {secure:false}
}));
app.use(passport.initialize());
app.use(passport.session());


const joinRoute = require('./routes/join.js');
app.use('/',(req, res) => {
	res.status(200).json({message: 'welcome'}); 
}); 
app.use('/join',joinRoute);

database.connect(()=>{
  app.listen(portNumber, err => {
    if(err) {
      console.log(`error connecting to server: ${err}`);
    }
    else {
      console.log(`server is up and running on port: ${portNumber}`);
    }
  })
})
