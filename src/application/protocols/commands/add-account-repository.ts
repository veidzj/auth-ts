export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export interface Input {
    username: string
    fullName: string
    email: string
    password: string
    birthdate: string
    profileImage?: string
    isActive: boolean
    roles: string[]
    createdAt: Date
  }
}
