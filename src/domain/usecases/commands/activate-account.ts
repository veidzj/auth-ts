export interface ActivateAccount {
  activate: (accountId: string) => Promise<void>
}
