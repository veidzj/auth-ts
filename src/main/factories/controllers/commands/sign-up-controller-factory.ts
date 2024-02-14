import { AddAccountFactory } from '@/main/factories/usecases/commands'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/commands'

export class SignUpControllerFactory {
  public static readonly makeSignUpController = (): Controller => {
    const controller = new SignUpController(AddAccountFactory.makeAddAccount())
    return controller
  }
}
