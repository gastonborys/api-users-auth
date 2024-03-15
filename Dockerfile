FROM node:16.20

WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 3001

CMD ["npm", "run", "dev"]
