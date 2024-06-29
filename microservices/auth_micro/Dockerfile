# node.js runtime 
FROM node:latest 

# setting up working directory in container
RUN mkdir /usr/src/app
WORKDIR /usr/src/app 

# copying package.json and package-lock.json 
COPY package.json package.json 
COPY package-lock.json package-lock.json 

# installing application dependencies
RUN apt-get update
RUN npm install 

# copying application code into directory
COPY . .

# starting application 
CMD ["node", "main.js"]  
