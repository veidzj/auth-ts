import { type Request, type Response, type NextFunction } from 'express'

import { logger } from '@/main/config'
import { type Middleware } from '@/presentation/protocols'

export class ExpressMiddlewareAdapter {
  public static readonly adapt = (middleware: Middleware): (req: Request, res: Response, next: NextFunction) => Promise<void> => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
      const request: object = {
        accessToken: req.headers?.['x-access-token'],
        confirmationCode: req.headers?.['x-confirmation-code'],
        ...(req.headers || {}),
        ...(req.body || {})
      }
      const httpResponse = await middleware.handle(request)
      const { statusCode, body } = httpResponse
      if (statusCode >= 200 && statusCode <= 299) {
        Object.assign(req.body, body)
        next()
      } else {
        if (statusCode >= 500) {
          logger.log('error', `${req.method} ${statusCode} ${req.path}`)
        } else {
          logger.log('warn', `${req.method} ${statusCode} ${req.path}`)
        }
        res.status(statusCode).json({
          error: {
            status: statusCode,
            type: body.name,
            message: body.message
          }
        })
      }
    }
  }
}
