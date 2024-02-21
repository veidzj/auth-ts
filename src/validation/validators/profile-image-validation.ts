import validator from 'validator'

import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class ProfileImageValidation implements Validation {
  validate(input: ProfileImageValidation.Input): void {
    if (input.profileImage) {
      if (!validator.isURL(input.profileImage)) {
        throw new ValidationError('Profile image must be a valid url')
      }
    }
  }
}

export namespace ProfileImageValidation {
  export interface Input {
    profileImage: string | undefined
  }
}
