import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeProfileImage } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class ChangeProfileImageController implements Controller {
  constructor(private readonly changeProfileImage: ChangeProfileImage) {}

  public async handle(request: ChangeProfileImageController.Request): Promise<HttpResponse> {
    try {
      await this.changeProfileImage.change(request.accountId, request.newProfileImage)
      return HttpHelper.noContent()
    } catch (error) {
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
