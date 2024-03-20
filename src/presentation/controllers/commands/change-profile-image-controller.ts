import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class ChangeProfileImageController implements Controller {
  public async handle(request: object): Promise<HttpResponse> {
    return HttpHelper.noContent()
  }
}
