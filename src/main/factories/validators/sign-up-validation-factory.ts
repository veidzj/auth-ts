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

export class SignUpValidationFactory {
  public static makeSignUpValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new UsernameValidation())
    validations.push(new FullNameValidation())
    validations.push(new EmailValidation())
    validations.push(new PasswordValidation())
    validations.push(new ProfileImageValidation())
    validations.push(new BirthdateValidation())
    return new ValidationComposite(validations)
  }
}
