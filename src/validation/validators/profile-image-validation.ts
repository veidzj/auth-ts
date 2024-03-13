import { type URLValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class ProfileImageValidation implements Validation {
  constructor(private readonly urlValidator: URLValidator) {}

  public validate(input: ProfileImageValidation.Input): void {
    if (input.profileImage) {
      if (!this.urlValidator.isValid(input.profileImage)) {
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
