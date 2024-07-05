docker kill muse_gateway
echo "y" | docker container prune 
docker rmi -f kong/kong-gateway:3.7.1.1
