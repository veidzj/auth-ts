import { type GetAccountByEmailRepository } from '@/application/protocols/queries'

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public output: GetAccountByEmailRepository.Output

  public async get(email: string): Promise<GetAccountByEmailRepository.Output> {
    this.email = email
    return this.output
  }
}
