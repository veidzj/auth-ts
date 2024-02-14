export const env = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/auth-ts',
  port: Number(process.env.PORT) ?? 5050,
  salt: Number(process.env.SALT) ?? 12
}
