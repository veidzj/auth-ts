import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class DateValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  public validate(input: object): void {
    const date: string = input[this.fieldName]
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ValidationError(`${this.fieldName} must be in the format YYYY-MM-DD (ISO 8601)`)
    }
  }
}
