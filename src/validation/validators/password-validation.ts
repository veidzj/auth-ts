import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  validate(input: PasswordValidation.Input): void {
    if (input.password.length < 6 || input.password.length > 255) {
      throw new ValidationError('Password must be between 6 and 255 characters long')
    }
    if (!/[a-zA-Z]/.test(input.password) || !/\d/.test(input.password) || !/[^\w\d]/.test(input.password)) {
      throw new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character')
    }
    const personalData = [input.username, input.email, input.fullName, input.birthdate]
    if (personalData.some((data: string) => input.password.toLowerCase().includes(data.toLowerCase()))) {
      throw new ValidationError('Password cannot contain personal data')
    }
  }
}

export namespace PasswordValidation {
  export interface Input {
    password: string
    username: string
    fullName: string
    email: string
    birthdate: string
  }
}
