information=$(curl -X GET http://localhost:8001/consumers/authentication_server/jwt)
kid=$(echo "$information" | grep -oP '"key":"\K[^"]+')

echo "$kid"  

head -n -1 ../microservices/auth_micro/.env > tmp.txt 
mv tmp.txt ../microservices/auth_micro/.env 

echo "API_GATEWAY_KID=$kid" >> ../microservices/auth_micro/.env
