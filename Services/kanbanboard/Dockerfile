FROM node:20-alpine

WORKDIR kanbanboard/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5003

CMD ["node", "kanbanboard.service.js"]
