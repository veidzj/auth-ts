import { SignUpValidationFactory } from '@/main/factories/validators'
import { AddAccountFactory } from '@/main/factories/usecases/commands'
import { AuthenticationFactory } from '@/main/factories/usecases/queries'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/commands'

export class SignUpControllerFactory {
  public static readonly makeSignUpController = (): Controller => {
    const controller = new SignUpController(SignUpValidationFactory.makeSignUpValidation(), AddAccountFactory.makeAddAccount(), AuthenticationFactory.makeAuthentication())
    return controller
  }
}
