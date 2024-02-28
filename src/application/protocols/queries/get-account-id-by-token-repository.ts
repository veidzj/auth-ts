export class GetAccountIdByTokenRepository {
  get: (input: GetAccountIdByTokenRepository.Input) => Promise<GetAccountIdByTokenRepository.Output>
}

export namespace GetAccountIdByTokenRepository {
  export interface Input {
    accessToken: string
    role: string
  }

  export interface Output {
    accountId: string
  }
}
