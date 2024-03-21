import { ChangeProfileImageValidationFactory } from '@/main/factories/validators'
import { ChangeProfileImageFactory } from '@/main/factories/usecases/commands'
import { makeLogErrorDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { ChangeProfileImageController } from '@/presentation/controllers/commands'

export class ChangeProfileImageControllerFactory {
  public static readonly makeChangeProfileImageController = (): Controller => {
    const controller = new ChangeProfileImageController(ChangeProfileImageValidationFactory.makeChangeProfileImageValidation(), ChangeProfileImageFactory.makeChangeProfileImage())
    return makeLogErrorDecorator(controller)
  }
}
