import { ChangePasswordValidationFactory } from '@/main/factories/validators'
import { ChangePasswordFactory } from '@/main/factories/usecases/commands'
import { makeLogErrorDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { ChangePasswordController } from '@/presentation/controllers/commands'

export class ChangePasswordControllerFactory {
  public static readonly makeChangePasswordController = (): Controller => {
    const controller = new ChangePasswordController(ChangePasswordValidationFactory.makeChangePasswordValidation(), ChangePasswordFactory.makeChangePassword())
    return makeLogErrorDecorator(controller)
  }
}
