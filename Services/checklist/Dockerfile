FROM node:20-alpine

WORKDIR checklist/

COPY . .

RUN npm i

EXPOSE 5002

CMD ["node", "checklist.service.js"]
