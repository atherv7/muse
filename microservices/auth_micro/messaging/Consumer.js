const amqp = require('amqplib'); 
const config = require('./config'); 
const axios = require('axios'); 

async function consumeMessage() {
    const connection = await amqp.connect(config.rabbitMQ.url); 
    const channel = await connection.createChannel(); 

    await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct'); 

    const que = await channel.assertQueue(config.rabbitMQ.queueName); 

    await channel.bindQueue(que.queue, config.rabbitMQ.exchangeName, 'Info'); 

    channel.consume(que.queue, async msg => {
        const data = JSON.parse(msg.content); 
        console.log("data has been consumed: " + data['message']); 
        try {
            const userInfo = await axios.get('http://localhost:3010/join/current-user', {headers:{'Authorization': `Bearer ${data['message']}`}}); 
            console.log(userInfo.data); 
            channel.ack(msg); 
        }
        catch(error) {
            console.log('error processing message: ' + error); 
        }
    });
}

module.exports = {consumeMessage}; 