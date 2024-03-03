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
    validations.push(new RequiredFieldValidation('Password'))
    validations.push(new EmailValidation(new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
  }
}
