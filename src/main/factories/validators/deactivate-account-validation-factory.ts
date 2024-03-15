import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  IdValidation
} from '@/validation/validators'
import { MongoIdValidatorAdapter } from '@/infra/validators'

export class DeactivateAccountValidationFactory {
  public static makeDeactivateAccountValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new IdValidation(new MongoIdValidatorAdapter(), 'accountId'))
    return new ValidationComposite(validations)
  }
}
