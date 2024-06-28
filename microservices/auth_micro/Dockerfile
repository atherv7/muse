# node.js runtime 
FROM node:14 

# setting up working directory in container
WORKDIR /usr/src/app 

# copying package.json and package-lock.json 
COPY package*.json ./ 

# installing application dependencies
RUN npm install 

# copying application code into directory
COPY . .

# exposing the port app runs on 
EXPOSE 3010

# starting application 
CMD ["node", "main.js"]  
