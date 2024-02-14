import { type Validation } from '@/presentation/protocols'

export class FullNameValidation implements Validation<string> {
  private readonly errors: string[] = []

  validate(fullName: string): string[] {
    if (fullName.length < 3 || fullName.length > 50) {
      this.errors.push('Full name must be between 3 and 50 characters long')
    }
    return this.errors
  }
}
