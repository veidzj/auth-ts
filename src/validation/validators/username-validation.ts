import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation<string> {
  private readonly errors: string[] = []

  validate(username: string): string[] {
    if (username.length < 3 || username.length > 16) {
      this.errors.push('Username must be between 3 and 16 characters long')
    }
    if (!/^[a-zA-Z]/.test(username)) {
      this.errors.push('Username must start with a letter')
    }
    return this.errors
  }
}
