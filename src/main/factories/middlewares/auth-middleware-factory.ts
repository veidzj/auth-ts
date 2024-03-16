import { GetAccountIdByTokenFactory } from '@/main/factories/usecases/queries'
import { makeLogErrorDecorator } from '@/main/factories/decorators'
import { type Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'

export class AuthMiddlewareFactory {
  public static readonly makeAuthMiddleware = (role: string): Middleware => {
    const middleware = new AuthMiddleware(GetAccountIdByTokenFactory.makeGetAccountIdByToken(), role)
    return makeLogErrorDecorator(middleware)
  }
}
