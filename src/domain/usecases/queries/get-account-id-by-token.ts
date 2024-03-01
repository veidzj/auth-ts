export interface GetAccountIdByToken {
  get: (input: GetAccountIdByToken.Input) => Promise<GetAccountIdByToken.Output>
}

export namespace GetAccountIdByToken {
  export interface Input {
    accessToken: string
    role: string
  }

  export interface Output {
    accountId: string
  }
}
