import validator from 'validator'
import { type IdValidator } from '@/validation/protocols'

export class MongoIdValidatorAdapter implements IdValidator {
  public isValid(id: string): boolean {
    return validator.isMongoId(id)
  }
}
