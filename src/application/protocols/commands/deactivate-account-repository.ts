export interface DeactivateAccountRepository {
  deactivate: (accountId: string) => Promise<boolean>
}
