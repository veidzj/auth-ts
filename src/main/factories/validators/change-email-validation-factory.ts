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
    validations.push(new RequiredFieldValidation('New email'))
    validations.push(new EmailValidation(new EmailValidatorAdapter(), 'New email'))
    return new ValidationComposite(validations)
  }
}
