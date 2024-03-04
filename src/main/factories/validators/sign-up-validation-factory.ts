import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  UsernameValidation,
  FullNameValidation,
  EmailValidation,
  PasswordValidation,
  ProfileImageValidation,
  BirthdateValidation
} from '@/validation/validators'
import { EmailValidatorAdapter, URLValidatorAdapter } from '@/infra/validators'

export class SignUpValidationFactory {
  public static makeSignUpValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new UsernameValidation())
    validations.push(new FullNameValidation())
    validations.push(new EmailValidation(new EmailValidatorAdapter()))
    validations.push(new PasswordValidation())
    validations.push(new ProfileImageValidation(new URLValidatorAdapter()))
    validations.push(new BirthdateValidation())
    return new ValidationComposite(validations)
  }
}
