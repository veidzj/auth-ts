export interface UpdateAccessTokenRepository {
  update: (input: UpdateAccessTokenRepository.Input) => Promise<void>
}

export namespace UpdateAccessTokenRepository {
  export interface Input {
    id: string
    accessToken: string
  }
}
