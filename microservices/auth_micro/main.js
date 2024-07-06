const express = require('express');
const passport = require('passport');
const cors = require('cors'); 
const session = require('express-session');
const bodyParser = require('body-parser'); 
const database = require('./database/db.js');
const consumer = require('./messaging/Consumer.js');

require('dotenv').config();
require('./config/passport_config.js');

const app = express();
const portNumber = process.env.PORT_NUMBER;

const corsOption = {
  origin: '*', 
  credentials: true, 
  optionSuccessStatus: 200 
};
app.use(cors(corsOption)); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure:false}
}));
app.use(passport.initialize());
app.use(passport.session());


const joinRoute = require('./routes/join.js');
app.use('/join',joinRoute);

consumer.consumeMessage(); 

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
