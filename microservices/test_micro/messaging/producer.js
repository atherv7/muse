const amqp = require('amqplib'); 
const config = require('./config'); 

class Producer {
    channel; 

    async createChannel() {
        try {
            const connection = await amqp.connect(config.rabbitMQ.url); 
            this.channel = await connection.createChannel();
        }
        catch (err) {
            console.log('error connecting to rabbitmq' + err.message); 
        } 
    }

    async publishMessage(routingKey, message) {
        if(!this.channel) {
            await this.createChannel(); 
        }

        await this.channel.assertExchange(config.rabbitMQ.exchangeName, "direct");

        await this.channel.publish(config.rabbitMQ.exchangeName, routingKey, Buffer.from(JSON.stringify({
            logType: routingKey,
            message: message, 
            dateTime: new Date(), 
        }))); 

        console.log(`request information of user with token: ${message} in exchange ${config.rabbitMQ.exchangeName}`); 
    }
}

module.exports = Producer; 