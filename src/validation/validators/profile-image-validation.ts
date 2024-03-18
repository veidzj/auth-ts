import { type URLValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class ProfileImageValidation implements Validation {
  constructor(
    private readonly urlValidator: URLValidator,
    private readonly fieldName: string
  ) {}

  public validate(input: object): void {
    const profileImage: string = input[this.fieldName]
    if (profileImage) {
      if (!this.urlValidator.isValid(profileImage)) {
        throw new ValidationError(`${this.fieldName} image must be a valid url`)
      }
    }
  }
}
