import { type Validation } from '@/presentation/protocols'

export class FullNameValidation implements Validation<string> {
  private readonly errors: string[] = []

  validate(fullName: string): string[] {
    if (fullName.length < 3 || fullName.length > 50) {
      this.errors.push('Full name must be between 3 and 50 characters long')
    }
    if (!/^[A-Z]/.test(fullName)) {
      this.errors.push('Full name must start with an uppercase letter')
    }
    if (/\s{2,}|^\s|\s$/.test(fullName)) {
      this.errors.push('Full name must be separated by a single space')
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*[À-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(fullName)) {
      this.errors.push('Full name can only contain letters and letters with accents')
    }
    return this.errors
  }
}
