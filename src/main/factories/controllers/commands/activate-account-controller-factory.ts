import { ActivateAccountValidationFactory } from '@/main/factories/validators'
import { ActivateAccountFactory } from '@/main/factories/usecases/commands'
import { type Controller } from '@/presentation/protocols'
import { ActivateAccountController } from '@/presentation/controllers/commands'

export class ActivateAccountControllerrFactory {
  public static readonly makeActivateAccountController = (): Controller => {
    const controller = new ActivateAccountController(ActivateAccountValidationFactory.makeActivateAccountValidation(), ActivateAccountFactory.makeActivateAccount())
    return controller
  }
}
