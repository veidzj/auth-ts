export const env = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/auth-ts',
  port: process.env.PORT ?? 5050,
  salt: process.env.SALT ?? 12,
  jwtSecret: process.env.JWT_SECRET ?? '-i]SB}/2£cq5FWr5u7hFJ1'
}
