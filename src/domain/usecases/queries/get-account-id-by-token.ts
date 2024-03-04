export interface GetAccountIdByToken {
  get: (accessToken: string, role: string) => Promise<string>
}
