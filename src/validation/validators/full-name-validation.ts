import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class FullNameValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  public validate(input: object): void {
    const fullName: string = input[this.fieldName]
    if (fullName.length < 3 || fullName.length > 50) {
      throw new ValidationError(`${this.fieldName} must be between 3 and 50 characters long`)
    }
    if (!/^[A-Z]/.test(fullName)) {
      throw new ValidationError(`${this.fieldName} must start with an uppercase letter`)
    }
    if (/\s{2,}|^\s|\s$/.test(fullName)) {
      throw new ValidationError(`${this.fieldName} must be separated by a single space`)
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(fullName)) {
      throw new ValidationError(`${this.fieldName} can only contain letters and letters with accents`)
    }
  }
}
