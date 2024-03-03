import { type URLValidator } from '@/validation/protocols'

export class URLValidatorSpy implements URLValidator {
  public url: string
  public islURLValid: boolean = true

  public isValid(url: string): boolean {
    this.url = url
    return this.islURLValid
  }
}
