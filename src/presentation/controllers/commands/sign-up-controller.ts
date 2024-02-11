import { type AddAccount } from '@/domain/usecases/commands'

export class SignUpController {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(request: SignUpController.Request): Promise<void> {
    await this.addAccount.add(request)
  }
}

export namespace SignUpController {
  export interface Request {
    username: string
    fullName: string
    email: string
    password: string
    birthdate: Date
    profileImage?: string
  }
}
