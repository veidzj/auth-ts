import { type Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  public input: object

  public validate(input: object): void {
    this.input = input
  }
}
