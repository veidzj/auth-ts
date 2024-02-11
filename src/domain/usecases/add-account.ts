export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<AddAccount.Output>
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

  export interface Output {
    accessToken: string
  }
}
