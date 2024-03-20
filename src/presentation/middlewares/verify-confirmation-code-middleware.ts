import { type HttpResponse, type Middleware } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type VerifyConfirmationCode } from '@/domain/usecases/queries'
import { InvalidOrExpiredConfirmationCodeError } from '@/domain/errors'

export class VerifyConfirmationCodeMiddleware implements Middleware {
  constructor(private readonly verifyConfirmationCode: VerifyConfirmationCode) {}

  public async handle(request: VerifyConfirmationCodeMiddleware.Request): Promise<HttpResponse> {
    try {
      await this.verifyConfirmationCode.verify(request.accountId, request.confirmationCode)
      return HttpHelper.noContent()
    } catch (error) {
      if (error instanceof InvalidOrExpiredConfirmationCodeError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace VerifyConfirmationCodeMiddleware {
  export interface Request {
    accountId: string
    confirmationCode: string
  }
}
