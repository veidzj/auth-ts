import { type LogErrorRepository } from '@/application/protocols/commands'

export class LogErrorRepositorySpy implements LogErrorRepository {
  public stack: string
  public errorId: string

  public async log(stack: string): Promise<string> {
    this.stack = stack
    return this.errorId
  }
}
