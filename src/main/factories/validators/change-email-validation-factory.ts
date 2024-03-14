import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  EmailValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export class ChangeEmailValidationFactory {
  public static makeChangeEmailValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('newEmail'))
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'newEmail'))
    return new ValidationComposite(validations)
  }
}
