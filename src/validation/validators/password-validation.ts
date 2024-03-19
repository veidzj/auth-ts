import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  public validate(input: object): void {
    const password: string = input[this.fieldName]
    if (password.length < 6 || password.length > 255) {
      throw new ValidationError(`${this.fieldName} must be between 6 and 255 characters long`)
    }
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[^\w]/.test(password)) {
      throw new ValidationError(`${this.fieldName} must contain at least 1 letter, 1 digit, and 1 special character`)
    }
  }
}
