const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const Producer = require('./messaging/producer'); 

const app = express(); 
const producer = new Producer(); 
const portNumber = 3020; 
const corsOption = {
    origin: '*', 
    credentials: true, 
    optionSuccessStatus: 200 
};
app.use(cors(corsOption)); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/', async (request, response)=>{
    // const token = request.headers.authorization.split(' ')[1]; 
    console.log(request.body);
    await producer.publishMessage(request.body.logType, request.body.message); 
    response.send(); 
}); 

app.listen(portNumber, err => {
    if(err) {
        console.log(`there is was an error running the app`); 
    }
    else {
        console.log(`app is listening on port ${portNumber}`)
    }
})