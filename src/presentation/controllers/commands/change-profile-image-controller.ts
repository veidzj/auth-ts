import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeProfileImage } from '@/domain/usecases/commands'

export class ChangeProfileImageController implements Controller {
  constructor(private readonly changeProfileImage: ChangeProfileImage) {}

  public async handle(request: ChangeProfileImageController.Request): Promise<HttpResponse> {
    await this.changeProfileImage.change(request.accountId, request.newProfileImage)
    return HttpHelper.noContent()
  }
}

export namespace ChangeProfileImageController {
  export interface Request {
    accountId: string
    newProfileImage: string
  }
}
