import { URLValidatorAdapter } from '@/infra/validators'
import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  ProfileImageValidation
} from '@/validation/validators'

export class ChangeProfileImageValidationFactory {
  public static makeChangeProfileImageValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new ProfileImageValidation(new URLValidatorAdapter(), 'newProfileImage'))
    return new ValidationComposite(validations)
  }
}
