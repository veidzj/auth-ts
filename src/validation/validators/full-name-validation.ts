import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class FullNameValidation implements Validation {
  public validate(input: FullNameValidation.Input): void {
    if (input.fullName.length < 3 || input.fullName.length > 50) {
      throw new ValidationError('Full name must be between 3 and 50 characters long')
    }
    if (!/^[A-Z]/.test(input.fullName)) {
      throw new ValidationError('Full name must start with an uppercase letter')
    }
    if (/\s{2,}|^\s|\s$/.test(input.fullName)) {
      throw new ValidationError('Full name must be separated by a single space')
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(input.fullName)) {
      throw new ValidationError('Full name can only contain letters and letters with accents')
    }
  }
}

export namespace FullNameValidation {
  export interface Input {
    fullName: string
  }
}
