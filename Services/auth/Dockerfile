FROM node:20-alpine

WORKDIR auth/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5001

CMD ["node", "auth.service.js"]
