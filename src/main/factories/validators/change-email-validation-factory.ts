import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export class ChangeEmailValidationFactory {
  public static makeChangeEmailValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new EmailValidation(new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
  }
}
