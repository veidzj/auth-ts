import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation {
  validate(input: UsernameValidation.Input): Error | null {
    if (input.username.length < 3 || input.username.length > 16) {
      return new ValidationError('Username must be between 3 and 16 characters long')
    }
    if (!/^[a-zA-Z]/.test(input.username)) {
      return new ValidationError('Username must start with a letter')
    }
    if (/\s/.test(input.username)) {
      return new ValidationError('Username must not contain spaces')
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(input.username)) {
      return new ValidationError('Username can only contain letters, digits, underscore, hyphen and dot')
    }
    return null
  }
}

export namespace UsernameValidation {
  export interface Input {
    username: string
  }
}
