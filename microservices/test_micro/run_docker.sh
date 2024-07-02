docker kill testing 
echo "y" | docker container prune 
docker image rm -f test_server
docker build -t test_server . 
docker run --name testing --publish 3020:3020 --network=musenet --ip 10.11.0.10 test_server
