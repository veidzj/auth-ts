export interface DeactivateAccount {
  deactivate: (input: DeactivateAccount.Input) => Promise<void>
}

export namespace DeactivateAccount {
  export interface Input {
    accountId: string
  }
}
