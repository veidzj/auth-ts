import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class BirthdateValidation implements Validation {
  validate(input: BirthdateValidation.Input): Error | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.birthdate)) {
      return new ValidationError('Birthdate must be in the format YYYY-MM-DD (ISO 8601)')
    }
    return null
  }
}

export namespace BirthdateValidation {
  export interface Input {
    birthdate: string
  }
}
