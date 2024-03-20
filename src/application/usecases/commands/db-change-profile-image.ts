import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type ChangeProfileImage } from '@/domain/usecases/commands'

export class DbChangeProfileImage implements ChangeProfileImage {
  constructor(private readonly checkAccountByIdRepository: CheckAccountByIdRepository) {}

  public async change(accountId: string, newProfileImage: string): Promise<void> {
    await this.checkAccountByIdRepository.check(accountId)
  }
}
