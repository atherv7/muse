# starting up docker network 
docker network create musenet --subnet=10.11.0.0/16

# starting up API gateway 
sh gateway/startup_gateway.sh

# starting up authentication server 
sh microservices/auth_micro/startup_authentication.sh 

# starting up test server 
sh microservices/test_micro/startup_testing.sh 
