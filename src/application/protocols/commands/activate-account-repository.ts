export interface ActivateAccountRepository {
  activate: (accountId: string) => Promise<boolean>
}
