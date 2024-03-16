import { type Request, type Response } from 'express'

import { logger } from '@/main/config'
import { type Controller } from '@/presentation/protocols'

export class ExpressRouteAdapter {
  public static readonly adapt = (controller: Controller): (req: Request, res: Response) => Promise<void> => {
    return async(req: Request, res: Response): Promise<void> => {
      const request: object = {
        ...(req.body ?? {}),
        ...(req.params ?? {}),
        ...(req.query ?? {})
      }
      const httpResponse = await controller.handle(request)
      const { statusCode, body } = httpResponse
      if (statusCode >= 200 && statusCode <= 299) {
        logger.log('info', `${req.method} ${statusCode} ${req.path}`)
        res.status(statusCode).json({
          data: body
        })
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
