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
        res.status(statusCode).json({
          data: body
        })
        logger.info(`${statusCode} ${req.method} ${req.path}`)
      } else {
        res.status(statusCode).json({
          error: {
            status: statusCode,
            type: body.name,
            message: body.message
          }
        })
        if (statusCode === 500) {
          logger.error(`${statusCode} ${req.method} ${req.path}`)
        } else {
          logger.warn(`${statusCode} ${req.method} ${req.path}`)
        }
      }
    }
  }
}
