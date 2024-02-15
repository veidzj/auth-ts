import validator from 'validator'

import { type Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  private readonly errors: string[] = []

  validate(input: { email: string }): string[] {
    if (!validator.isEmail(input.email)) {
      this.errors.push('Email must be a valid email')
    }
    return this.errors
  }
}
