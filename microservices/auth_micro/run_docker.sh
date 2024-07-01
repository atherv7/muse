docker kill authentication
echo "y" | docker container prune
docker image rm -f auth_server 
docker build -t auth_server .
docker run --name authentication \
           --publish 3010:3010 \
           --network=muse_net \ 
           auth_server 
