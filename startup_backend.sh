# starting up docker network 
docker network create musenet --subnet=10.11.0.0/16

# starting up API gateway 
cd ./gateway
sh ./startup_gateway.sh
cd ../

# starting up microservices
cd ./microservices/
# starting up authentication server
cd ./auth_micro/ 
sh ./startup_authentication.sh 
cd ../
# starting up test server 
cd ./test_micro/
sh ./startup_testing.sh 
cd ../

cd ../
