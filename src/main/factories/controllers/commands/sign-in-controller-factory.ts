import { AuthenticationFactory } from '@/main/factories/usecases/commands'
import { SignInValidationFactory } from '@/main/factories/validators'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/commands'

export class SignInControllerFactory {
  public static readonly makeSignInController = (): Controller => {
    const controller = new SignInController(SignInValidationFactory.makeSignInValidation(), AuthenticationFactory.makeAuthentication())
    return controller
  }
}
