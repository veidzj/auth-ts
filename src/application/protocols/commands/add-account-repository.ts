export class AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export interface Input {
    id: string
    username: string
    fullName: string
    email: string
    password: string
    birthdate: Date
    profileImage?: string
    isActive: boolean
    createdAt: Date
  }
}
