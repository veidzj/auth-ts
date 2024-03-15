import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export class SendConfirmationCodeValidationFactory {
  public static makeSendConfirmationCodeValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    return new ValidationComposite(validations)
  }
}
