export interface GetAccountIdByTokenRepository {
  get: (accessToken: string, role: string) => Promise<string | null>
}
