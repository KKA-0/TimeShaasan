FROM node:20-alpine

WORKDIR pomodoro/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5004

CMD ["node", "pomodoro.service.js"]
