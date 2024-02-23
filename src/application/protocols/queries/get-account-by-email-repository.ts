export class GetAccountByEmailRepository {
  get: (email: string) => Promise<GetAccountByEmailRepository.Output>
}

export namespace GetAccountByEmailRepository {
  export interface Output {
    id: string
    password: string
  }
}
