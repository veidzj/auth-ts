import { type AddAccount } from '@/domain/usecases/commands'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: AddAccount.Output

  public async add(input: AddAccount.Input): Promise<AddAccount.Output> {
    this.input = input
    return this.output
  }
}
