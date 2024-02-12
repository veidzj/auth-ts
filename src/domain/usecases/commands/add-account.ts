export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<void>
}

export namespace AddAccount {
  export interface Input {
    username: string
    fullName: string
    email: string
    password: string
    birthdate: Date
    profileImage?: string
  }
}
