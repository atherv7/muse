# cleanup microservices 
cd ./microservices/

# cleanup test server 
cd ./test_micro/
sh ./cleanup_testing.sh
cd ../

# cleanup authentication server 
cd ./auth_micro/
sh ./cleanup_authentication.sh
cd ../

cd ../

# cleanup API gateway 
cd ./gateway/
sh ./cleanup_gateway.sh 
cd ../
# remove network 
docker network rm musenet 
