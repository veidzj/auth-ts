import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type ChangeProfileImageRepository } from '@/application/protocols/commands'
import { type ChangeProfileImage } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbChangeProfileImage implements ChangeProfileImage {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
    private readonly changeProfileImageRepository: ChangeProfileImageRepository
  ) {}

  public async change(accountId: string, newProfileImage: string): Promise<void> {
    const accountExists = await this.checkAccountByIdRepository.check(accountId)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
    await this.changeProfileImageRepository.change(accountId, newProfileImage)
  }
}
