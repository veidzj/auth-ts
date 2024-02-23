import { type UpdateAccessTokenRepository } from '@/application/protocols/commands'

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  public input: UpdateAccessTokenRepository.Input

  public async update(input: UpdateAccessTokenRepository.Input): Promise<void> {
    this.input = input
  }
}
