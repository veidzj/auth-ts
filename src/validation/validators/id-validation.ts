import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'
import { type IdValidator } from '@/validation/protocols'

export class IdValidation implements Validation {
  constructor(
    private readonly idValidator: IdValidator,
    private readonly fieldName: string
  ) {}

  validate(input: object): void {
    const id: string = input[this.fieldName]
    if (!this.idValidator.isValid(id)) {
      throw new ValidationError(`${this.fieldName} must be a valid id`)
    }
  }
}
