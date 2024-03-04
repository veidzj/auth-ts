import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'
import { InvalidCredentialsError, AccessDeniedError } from '@/domain/errors'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly getAccountIdByToken: GetAccountIdByToken,
    private readonly role: string
  ) {}

  public async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      if (!request.accessToken) {
        return HttpHelper.unauthorized(new InvalidCredentialsError())
      }
      const accountId = await this.getAccountIdByToken.get(request.accessToken, this.role)
      return HttpHelper.ok({ accountId })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return HttpHelper.unauthorized(error)
      }
      if (error instanceof AccessDeniedError) {
        return HttpHelper.forbidden(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
