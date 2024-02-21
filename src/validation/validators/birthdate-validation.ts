import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class BirthdateValidation implements Validation {
  validate(input: BirthdateValidation.Input): void {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.birthdate)) {
      throw new ValidationError('Birthdate must be in the format YYYY-MM-DD (ISO 8601)')
    }
  }
}

export namespace BirthdateValidation {
  export interface Input {
    birthdate: string
  }
}
