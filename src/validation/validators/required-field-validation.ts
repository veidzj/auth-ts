import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  public validate(input: object): void {
    if (!input[(this.fieldName)]) {
      throw new ValidationError(`${this.fieldName} is required`)
    }
  }
}
