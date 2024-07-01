docker kill gateway
docker container rm gateway
echo "y" | docker container prune 
docker network rm muse_net