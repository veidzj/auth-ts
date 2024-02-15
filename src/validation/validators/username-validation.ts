import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation {
  private readonly errors: string[] = []

  validate(input: { username: string }): string[] {
    if (input.username.length < 3 || input.username.length > 16) {
      this.errors.push('Username must be between 3 and 16 characters long')
    }
    if (!/^[a-zA-Z]/.test(input.username)) {
      this.errors.push('Username must start with a letter')
    }
    if (/\s/.test(input.username)) {
      this.errors.push('Username must not contain spaces')
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(input.username)) {
      this.errors.push('Username can only contain letters, digits, underscore, hyphen and dot')
    }
    return this.errors
  }
}
