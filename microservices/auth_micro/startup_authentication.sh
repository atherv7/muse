docker build -t auth_server .
docker run --name authentication --publish 3010:3010 --network=musenet --ip=10.11.0.12 auth_server 
