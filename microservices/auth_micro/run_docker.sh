docker kill authentication
echo "y" | docker container prune
docker image rm -f auth_server 
docker build -t auth_server .
docker run --publish 3010:3010 --name authentication auth_server 
