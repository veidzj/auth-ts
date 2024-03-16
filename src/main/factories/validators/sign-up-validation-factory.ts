import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  UsernameValidation,
  FullNameValidation,
  EmailValidation,
  PasswordValidation,
  ProfileImageValidation,
  DateValidation
} from '@/validation/validators'
import { EmailValidatorAdapter, URLValidatorAdapter } from '@/infra/validators'

export class SignUpValidationFactory {
  public static makeSignUpValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new UsernameValidation())
    validations.push(new FullNameValidation())
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    validations.push(new PasswordValidation('password'))
    validations.push(new ProfileImageValidation(new URLValidatorAdapter()))
    validations.push(new DateValidation('birthdate'))
    return new ValidationComposite(validations)
  }
}
