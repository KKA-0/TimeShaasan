FROM node:20-alpine

WORKDIR auth/

COPY . .

RUN npm i

EXPOSE 5001

CMD ["node", "auth.service.js"]
