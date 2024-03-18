import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  PasswordValidation
} from '@/validation/validators'

export class ChangePasswordValidationFactory {
  public static makeChangePasswordValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new PasswordValidation('newPassword'))
    return new ValidationComposite(validations)
  }
}
