import validator from 'validator'

import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class ProfileImageValidation implements Validation {
  validate(input: ProfileImageValidation.Input): Error | null {
    if (input.profileImage) {
      if (!validator.isURL(input.profileImage)) {
        return new ValidationError('Profile image must be a valid url')
      }
    }
    return null
  }
}

export namespace ProfileImageValidation {
  export interface Input {
    profileImage: string | undefined
  }
}
