import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  IdValidation
} from '@/validation/validators'
import { MongoIdValidatorAdapter } from '@/infra/validators'

export class ActivateAccountValidationFactory {
  public static makeActivateAccountValidation(): ValidationComposite {
    const validations: Validation[] = []
    validations.push(new IdValidation(new MongoIdValidatorAdapter(), 'accountId'))
    return new ValidationComposite(validations)
  }
}
