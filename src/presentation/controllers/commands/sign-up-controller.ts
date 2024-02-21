import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddAccount } from '@/domain/usecases/commands'
import { ValidationError } from '@/validation/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.addAccount.add(request)
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.badRequest({})
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
