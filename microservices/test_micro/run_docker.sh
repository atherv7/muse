docker kill testing 
echo "y" | docker container prune 
docker image rm -f test_server
docker build -t test_server . 
docker run --name testing \
           --publish 3020:3020 \
           --network=muse_net \ 
           test_server
