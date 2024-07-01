const express = require('express'); 

const app = express(); 
const portNumber = 3020; 

app.get('/', (request, response)=>{
    response.setHeader('Content-Type', 'application/json'); 
    response.send(JSON.stringify({message:'hello'})); 
}); 

app.listen(portNumber, err => {
    if(err) {
        console.log(`there is was an error running the app`); 
    }
    else {
        console.log(`app is listening on port ${portNumber}`)
    }
})