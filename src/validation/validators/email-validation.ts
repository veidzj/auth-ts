import validator from 'validator'

import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  validate(input: EmailValidation.Input): void {
    if (!validator.isEmail(input.email)) {
      throw new ValidationError('Email must be a valid email')
    }
  }
}

export namespace EmailValidation {
  export interface Input {
    email: string
  }
}
