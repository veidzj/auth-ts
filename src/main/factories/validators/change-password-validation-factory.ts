import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  EmailValidation,
  PasswordValidation
} from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export class ChangePasswordValidationFactory {
  public static makeChangePasswordValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
    validations.push(new PasswordValidation('newPassword'))
    return new ValidationComposite(validations)
  }
}
