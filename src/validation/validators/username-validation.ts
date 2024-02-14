import { type Validation } from '@/presentation/protocols'

export class UsernameValidation implements Validation<string> {
  validate(username: string): Error | null {
    if (username.length < 3) {
      return new Error('Username must be at least 3 characters long')
    }
    return null
  }
}
