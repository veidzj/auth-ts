import { type UpdateAccessTokenRepository } from '@/application/protocols/commands'

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  public id: string
  public accessToken: string

  public async update(id: string, accessToken: string): Promise<void> {
    this.id = id
    this.accessToken = accessToken
  }
}
