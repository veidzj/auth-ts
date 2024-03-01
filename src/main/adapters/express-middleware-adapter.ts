import { type Request, type Response, type NextFunction } from 'express'

import { type Middleware } from '@/presentation/protocols'

export class ExpressMiddlewareAdapter {
  public static readonly adapt = (middleware: Middleware): (req: Request, res: Response, next: NextFunction) => Promise<void> => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
      const request = {
        accessToken: req.headers?.['x-access-token'],
        ...(req.headers || {})
      }
      const httpResponse = await middleware.handle(request)
      const { statusCode, body } = httpResponse
      if (statusCode === 200) {
        Object.assign(req.body, body)
        next()
      } else {
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
