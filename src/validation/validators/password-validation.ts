import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation<string> {
  private readonly errors: string[] = []

  validate(password: string, options?: { username: string, fullName: string, email: string, birthdate: string }): string[] {
    if (password.length < 6 || password.length > 255) {
      this.errors.push('Password must be between 6 and 255 characters long')
    }
    return this.errors
  }
}
