import { type Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  public input: object
  public error: Error | null

  public validate(input: object): Error | null {
    this.input = input
    return this.error
  }
}
