import { type Middleware, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'
import { InvalidCredentialsError } from '@/domain/errors'

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
      await this.getAccountIdByToken.get({ accessToken: request.accessToken, role: this.role })
      return HttpHelper.ok({})
    } catch (error) {
      return HttpHelper.serverError()
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
