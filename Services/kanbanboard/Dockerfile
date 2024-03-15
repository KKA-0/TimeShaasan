FROM node:20-alpine

WORKDIR kanbanboard/

COPY . .

RUN npm i

EXPOSE 5003

CMD ["node", "kanbanboard.service.js"]
