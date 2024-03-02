export interface DeactivateAccountRepository {
  deactivate: (input: DeactivateAccountRepository.Input) => Promise<boolean>
}

export namespace DeactivateAccountRepository {
  export interface Input {
    accountId: string
  }
}
