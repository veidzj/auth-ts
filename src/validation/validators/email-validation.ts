import validator from 'validator'

import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  validate(input: EmailValidation.Input): Error | null {
    if (!validator.isEmail(input.email)) {
      return new ValidationError('Email must be a valid email')
    }
    return null
  }
}

export namespace EmailValidation {
  export interface Input {
    email: string
  }
}
