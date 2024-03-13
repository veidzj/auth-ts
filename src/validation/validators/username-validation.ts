import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation {
  public validate(input: UsernameValidation.Input): void {
    if (input.username.length < 3 || input.username.length > 16) {
      throw new ValidationError('Username must be between 3 and 16 characters long')
    }
    if (!/^[a-zA-Z]/.test(input.username)) {
      throw new ValidationError('Username must start with a letter')
    }
    if (/\s/.test(input.username)) {
      throw new ValidationError('Username must not contain spaces')
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(input.username)) {
      throw new ValidationError('Username can only contain letters, digits, underscore, hyphen and dot')
    }
  }
}

export namespace UsernameValidation {
  export interface Input {
    username: string
  }
}
