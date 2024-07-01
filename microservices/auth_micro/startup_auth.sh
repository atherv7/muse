docker build -t auth_server . 
docker run --publish 3010:3010 --name authentication auth_server 