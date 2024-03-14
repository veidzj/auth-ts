import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export class SignInValidationFactory {
  public static makeSignInValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('password'))
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    return new ValidationComposite(validations)
  }
}
