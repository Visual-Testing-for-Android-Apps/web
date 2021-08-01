FROM node:14

# working directory
WORKDIR /usr/src/app

# copy all dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
