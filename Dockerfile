FROM node:20-alpine

WORKDIR /usr/src/auth-ts

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY . .

ENV PORT=5000

EXPOSE $PORT

CMD ["npm", "start"]
