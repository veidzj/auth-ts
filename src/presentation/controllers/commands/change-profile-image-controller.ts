import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type ChangeProfileImage } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class ChangeProfileImageController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly changeProfileImage: ChangeProfileImage
  ) {}

  public async handle(request: ChangeProfileImageController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.changeProfileImage.change(request.accountId, request.newProfileImage)
      return HttpHelper.noContent()
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace ChangeProfileImageController {
  export interface Request {
    accountId: string
    newProfileImage: string
  }
}
