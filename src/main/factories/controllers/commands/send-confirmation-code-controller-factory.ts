import { SendConfirmationCodeValidationFactory } from '@/main/factories/validators'
import { SendConfirmationCodeFactory } from '@/main/factories/usecases/commands'
import { makeLogErrorDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { SendConfirmationCodeController } from '@/presentation/controllers/commands'

export class SendConfirmationCodeControllerFactory {
  public static readonly makeSendConfirmationCodeController = (): Controller => {
    const controller = new SendConfirmationCodeController(SendConfirmationCodeValidationFactory.makeSendConfirmationCodeValidation(), SendConfirmationCodeFactory.makeSendConfirmationCode())
    return makeLogErrorDecorator(controller)
  }
}
