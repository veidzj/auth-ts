export interface ChangePasswordRepository {
  change: (accountId: string, newPassword: string) => Promise<void>
}
