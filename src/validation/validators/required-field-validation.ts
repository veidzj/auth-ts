import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: object): void {
    if (!input[this.fieldName.toLowerCase()]) {
      throw new ValidationError(`${this.fieldName} is required`)
    }
  }
}
