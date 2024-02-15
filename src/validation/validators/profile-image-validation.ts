import validator from 'validator'

import { type Validation } from '@/presentation/protocols'

export class ProfileImageValidation implements Validation {
  private readonly errors: string[] = []

  validate(input: { profileImage: string }): string[] {
    if (!validator.isURL(input.profileImage)) {
      this.errors.push('Profile image must be a valid url')
    }
    return this.errors
  }
}
