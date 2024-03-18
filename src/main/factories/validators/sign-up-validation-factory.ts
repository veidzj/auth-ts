import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
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
    validations.push(new RequiredFieldValidation('username'))
    validations.push(new RequiredFieldValidation('fullName'))
    validations.push(new RequiredFieldValidation('email'))
    validations.push(new RequiredFieldValidation('password'))
    validations.push(new RequiredFieldValidation('birthdate'))
    validations.push(new UsernameValidation('username'))
    validations.push(new FullNameValidation('fullName'))
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    validations.push(new PasswordValidation('password'))
    validations.push(new ProfileImageValidation(new URLValidatorAdapter(), 'profileImage'))
    validations.push(new DateValidation('birthdate'))
    return new ValidationComposite(validations)
  }
}
