import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  validate(input: PasswordValidation.Input): Error | null {
    if (input.password.length < 6 || input.password.length > 255) {
      return new ValidationError('Password must be between 6 and 255 characters long')
    }
    if (!/(?=[a-zA-Z])(?=\D)(?=.*[^\w\d])/.test(input.password)) {
      return new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character')
    }
    const personalData = [input.username, input.email, input.fullName, input.birthdate]
    if (personalData.some((data: string) => input.password.toLowerCase().includes(data.toLowerCase()))) {
      return new ValidationError('Password cannot contain personal data')
    }
    return null
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
