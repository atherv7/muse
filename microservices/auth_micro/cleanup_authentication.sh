docker kill authentication
echo "y" | docker container prune
docker rmi -f auth_server
