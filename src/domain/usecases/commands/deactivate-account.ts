export interface DeactivateAccount {
  deactivate: (accountId: string) => Promise<void>
}
