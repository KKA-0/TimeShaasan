FROM node:20-alpine

WORKDIR notify/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5005

CMD ["node", "notify.service.js"]
