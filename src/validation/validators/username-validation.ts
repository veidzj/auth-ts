import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  public validate(input: object): void {
    const username: string = input[this.fieldName]
    if (username.length < 3 || username.length > 16) {
      throw new ValidationError(`${this.fieldName} must be between 3 and 16 characters long`)
    }
    if (!/^[a-zA-Z]/.test(username)) {
      throw new ValidationError(`${this.fieldName} must start with a letter`)
    }
    if (/\s/.test(username)) {
      throw new ValidationError(`${this.fieldName} must not contain spaces`)
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      throw new ValidationError(`${this.fieldName} can only contain letters, digits, underscore, hyphen and dot`)
    }
  }
}
