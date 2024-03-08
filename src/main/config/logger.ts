import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`),
    format.colorize({ all: true })
  ),
  transports: [
    new transports.Console({ level: 'info' })
  ]
})
