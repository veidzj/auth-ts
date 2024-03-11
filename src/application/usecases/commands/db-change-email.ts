import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangeEmail } from '@/domain/usecases/commands'

export class DbChangeEmail implements ChangeEmail {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    await this.checkAccountByEmailRepository.check(currentEmail)
  }
}
