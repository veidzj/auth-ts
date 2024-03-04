import validator from 'validator'
import { type URLValidator } from '@/validation/protocols'

export class URLValidatorAdapter implements URLValidator {
  public isValid(url: string): boolean {
    return validator.isURL(url)
  }
}
