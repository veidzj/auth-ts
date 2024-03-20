import { VerifyConfirmationCodeFactory } from '@/main/factories/usecases/queries'
import { makeLogErrorDecorator } from '@/main/factories/decorators'
import { type Middleware } from '@/presentation/protocols'
import { VerifyConfirmationCodeMiddleware } from '@/presentation/middlewares'

export class VerifyConfirmationCodeMiddlewareFactory {
  public static readonly makeVerifyConfirmationCodeMiddleware = (): Middleware => {
    const middleware = new VerifyConfirmationCodeMiddleware(VerifyConfirmationCodeFactory.makeVerifyConfirmationCode())
    return makeLogErrorDecorator(middleware)
  }
}
