docker build -t test_server .
docker run -d --name testing --network=musenet --publish 3020:3020 --ip 10.11.0.10 test_server 

