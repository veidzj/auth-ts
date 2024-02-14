import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation<string> {
  private readonly errors: string[] = []

  validate(username: string): string[] {
    if (username.length < 3) {
      this.errors.push('Username must be at least 3 characters long')
    }
    return this.errors
  }
}
