import { type ChangeProfileImage } from '@/domain/usecases/commands'

export class ChangeProfileImageSpy implements ChangeProfileImage {
  public accountId: string
  public newProfileImage: string

  public async change(accountId: string, newProfileImage: string): Promise<void> {
    this.accountId = accountId
    this.newProfileImage = newProfileImage
  }
}
