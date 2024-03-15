export const env = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/auth-ts',
  port: process.env.PORT ?? 5050,
  salt: process.env.SALT ?? 12,
  jwtSecret: process.env.JWT_SECRET ?? '-i]SB}/2£cq5FWr5u7hFJ1',
  smtpHost: process.env.SMTP_HOST ?? 'sandbox.smtp.mailtrap.io',
  smtpPort: process.env.SMTP_PORT ?? 2525,
  smtpUser: process.env.SMTP_USER ?? '8f479c7211d962',
  smtpPass: process.env.SMTP_PASS ?? '2d2ff61bed9f2e'
}
