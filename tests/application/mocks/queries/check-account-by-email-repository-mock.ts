import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string
  public output: boolean = false

  public async check(email: string): Promise<boolean> {
    this.email = email
    return this.output
  }
}
