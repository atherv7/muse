docker kill authentication
echo "y" | docker container prune
docker image rm -f auth_server 