export interface DeactivateAccountRepository {
  deactivate: (input: DeactivateAccountRepository.Input) => Promise<void>
}

export namespace DeactivateAccountRepository {
  export interface Input {
    accountId: string
  }
}
