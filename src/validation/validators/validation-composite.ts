import { type Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  private errors: string[] = []

  constructor(private readonly validations: Validation[]) {}

  public validate(input: object): string[] {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        this.errors = this.errors.concat(error)
      }
    }
    return this.errors
  }
}
