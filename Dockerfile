FROM node:20 as builder

WORKDIR /usr/src/auth-ts

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-slim

WORKDIR /usr/src/auth-ts

COPY --from=builder /usr/src/auth-ts .

RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000

CMD ["npm", "start"]
