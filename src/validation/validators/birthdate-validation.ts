import { type Validation } from '@/presentation/protocols'

export class BirthdateValidation implements Validation {
  private readonly errors: string[] = []

  validate(input: { birthdate: string }): string[] {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.birthdate)) {
      this.errors.push('Birthdate must be in the format YYYY-MM-DD (ISO 8601)')
    }
    return this.errors
  }
}