docker run -d --network=musenet --ip 10.11.0.13 --name rabbit_server -p 8080:15672 -p 5672:5672 rabbitmq:3-management
