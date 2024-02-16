import { AddAccountFactory } from '@/main/factories/usecases/commands'
import { SignUpValidationFactory } from '@/main/factories/validators'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/commands'

export class SignUpControllerFactory {
  public static readonly makeSignUpController = (): Controller => {
    const controller = new SignUpController(SignUpValidationFactory.makeSignUpValidation(), AddAccountFactory.makeAddAccount())
    return controller
  }
}
