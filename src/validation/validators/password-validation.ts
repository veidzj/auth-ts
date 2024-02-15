import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  private readonly errors: string[] = []

  validate(input: { password: string }, options: { username: string, fullName: string, email: string, birthdate: string }): string[] {
    if (input.password.length < 6 || input.password.length > 255) {
      this.errors.push('Password must be between 6 and 255 characters long')
    }
    if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(input.password)) {
      this.errors.push('Password must contain at least 1 letter, 1 digit, and 1 special character')
    }
    const personalData = [options.username, options.email, options.fullName, options.birthdate]
    if (personalData.some((data: string) => input.password.toLowerCase().includes(data.toLowerCase()))) {
      this.errors.push('Password cannot contain personal data')
    }
    return this.errors
  }
}
