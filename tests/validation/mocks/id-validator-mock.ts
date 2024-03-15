import { type IdValidator } from '@/validation/protocols'

export class IdValidatorSpy implements IdValidator {
  public id: string
  public isIdValid: boolean = true

  public isValid(id: string): boolean {
    this.id = id
    return this.isIdValid
  }
}
