import { type CheckAccountByIdRepository } from '@/application/protocols/queries'

export class CheckAccountByIdRepositorySpy implements CheckAccountByIdRepository {
  public id: string
  public output: boolean = true

  public async check(id: string): Promise<boolean> {
    this.id = id
    return this.output
  }
}
