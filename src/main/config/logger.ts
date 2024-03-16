import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`),
    winston.format.colorize({ all: true })
  ),
  transports: [
    new winston.transports.Console()
  ]
})
