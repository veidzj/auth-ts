import { type Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  public input: object
  public errors: string[]

  public validate(input: object): string[] {
    this.input = input
    return this.errors
  }
}
