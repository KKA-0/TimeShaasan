FROM node:20-alpine

WORKDIR pomodoro/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5005

CMD ["node", "settings.service.js"]
