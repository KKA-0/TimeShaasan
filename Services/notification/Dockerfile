FROM node:20-alpine

WORKDIR notify/

COPY . .

RUN npm i

EXPOSE 5005

CMD ["node", "notify.service.js"]
