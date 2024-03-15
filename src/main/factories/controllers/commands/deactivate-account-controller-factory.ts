import { DeactivateAccountValidationFactory } from '@/main/factories/validators'
import { DeactivateAccountFactory } from '@/main/factories/usecases/commands'
import { type Controller } from '@/presentation/protocols'
import { DeactivateAccountController } from '@/presentation/controllers/commands'

export class DeactivateAccountControllerFactory {
  public static readonly makeDeactivateAccountController = (): Controller => {
    const controller = new DeactivateAccountController(DeactivateAccountValidationFactory.makeDeactivateAccountValidation(), DeactivateAccountFactory.makeDeactivateAccount())
    return controller
  }
}
