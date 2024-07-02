docker kill testing
echo "y" | docker container prune
docker rmi -f test_server 
