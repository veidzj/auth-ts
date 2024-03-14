import { type AddConfirmationCodeRepository } from '@/application/protocols/commands'

export class AddConfirmationCodeRepositorySpy implements AddConfirmationCodeRepository {
  public confirmationCode: string

  public async add(confirmationCode: string): Promise<void> {
    this.confirmationCode = confirmationCode
  }
}
