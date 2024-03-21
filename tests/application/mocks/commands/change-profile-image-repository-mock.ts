import { type ChangeProfileImageRepository } from '@/application/protocols/commands'

export class ChangeProfileImageRepositorySpy implements ChangeProfileImageRepository {
  public accountId: string
  public newProfileImage: string

  public async change(accountId: string, newProfileImage: string): Promise<void> {
    this.accountId = accountId
    this.newProfileImage = newProfileImage
  }
}
