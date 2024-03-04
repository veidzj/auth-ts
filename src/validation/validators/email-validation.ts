import { type EmailValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor(private readonly emailValidator: EmailValidator) {}

  validate(input: EmailValidation.Input): void {
    if (!this.emailValidator.isValid(input.email)) {
      throw new ValidationError('Email must be a valid email')
    }
  }
}

export namespace EmailValidation {
  export interface Input {
    email: string
  }
}
