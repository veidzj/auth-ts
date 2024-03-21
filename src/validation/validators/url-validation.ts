import { type URLValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class URLValidation implements Validation {
  constructor(
    private readonly urlValidator: URLValidator,
    private readonly fieldName: string
  ) {}

  public validate(input: object): void {
    const url: string = input[this.fieldName]
    if (url) {
      if (!this.urlValidator.isValid(url)) {
        throw new ValidationError(`${this.fieldName} image must be a valid url`)
      }
    }
  }
}
