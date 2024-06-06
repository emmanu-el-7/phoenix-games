FROM node:20

WORKDIR /phoenix-games

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
