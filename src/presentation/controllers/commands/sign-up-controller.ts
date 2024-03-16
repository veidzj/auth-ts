import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type AddAccount, type Authentication } from '@/domain/usecases/commands'
import { AccountAlreadyExistsError } from '@/domain/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const insertedId = await this.addAccount.add(request)
      const accessToken = await this.authentication.auth(request.email, request.password)
      return HttpHelper.ok({
        insertedId,
        accessToken
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountAlreadyExistsError) {
        return HttpHelper.conflict(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace SignUpController {
  export interface Request {
    username: string
    fullName: string
    email: string
    password: string
    birthdate: string
    profileImage?: string
  }
}
