import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class ChangePasswordController implements Controller {
  constructor(
    private readonly validation: Validation
  ) {}

  public async handle(request: ChangePasswordController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return HttpHelper.noContent()
  }
}

export namespace ChangePasswordController {
  export interface Request {
    email: string
    newPassword: string
  }
}
