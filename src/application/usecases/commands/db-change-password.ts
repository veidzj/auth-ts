import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangePassword } from '@/domain/usecases/commands'

export class DbChangePassword implements ChangePassword {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  public async change(email: string, password: string): Promise<void> {
    await this.checkAccountByEmailRepository.check(email)
  }
}
