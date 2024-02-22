import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation
  ) {}

  public async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return HttpHelper.ok({})
    } catch (error) {
      return HttpHelper.serverError()
    }
  }
}

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
