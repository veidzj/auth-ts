FROM node:20 as builder

WORKDIR /usr/src/auth-ts

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY . .

FROM node:20-alpine

WORKDIR /usr/src/auth-ts

COPY --from=builder /usr/src/auth-ts .

RUN npm install

ENV PORT=5000

EXPOSE $PORT

CMD ["npm", "start"]
