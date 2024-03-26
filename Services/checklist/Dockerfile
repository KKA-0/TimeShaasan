FROM node:20-alpine

WORKDIR checklist/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5002

CMD ["node", "checklist.service.js"]
