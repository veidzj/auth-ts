import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddAccount } from '@/domain/usecases/commands'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return HttpHelper.badRequest(error)
    }
    await this.addAccount.add(request)
    return HttpHelper.ok({})
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
