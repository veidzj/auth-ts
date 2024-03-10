import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeEmail } from '@/domain/usecases/commands'

export class ChangeEmailController implements Controller {
  constructor(private readonly changeEmail: ChangeEmail) {}

  public async handle(request: ChangeEmailController.Request): Promise<HttpResponse> {
    await this.changeEmail.change(request.currentEmail, request.newEmail)
    return HttpHelper.ok({})
  }
}

export namespace ChangeEmailController {
  export interface Request {
    currentEmail: string
    newEmail: string
  }
}
