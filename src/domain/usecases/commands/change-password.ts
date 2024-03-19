export interface ChangePassword {
  change: (accountId: string, newPassword: string) => Promise<void>
}
