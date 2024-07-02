# cleanup test server 
sh microservices/test_micro/cleanup_testing.sh

# cleanup authentication server 
sh microservices/auth_micro/cleanup_authentication.sh

# cleanup API gateway 
sh gateway/cleanup_gateway.sh 

# remove network 
# docker network rm musenet 
