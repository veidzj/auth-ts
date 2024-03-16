import { ChangeEmailValidationFactory } from '@/main/factories/validators'
import { ChangeEmailFactory } from '@/main/factories/usecases/commands'
import { makeLogErrorDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { ChangeEmailController } from '@/presentation/controllers/commands'

export class ChangeEmailControllerFactory {
  public static readonly makeChangeEmailController = (): Controller => {
    const controller = new ChangeEmailController(ChangeEmailValidationFactory.makeChangeEmailValidation(), ChangeEmailFactory.makeChangeEmail())
    return makeLogErrorDecorator(controller)
  }
}
