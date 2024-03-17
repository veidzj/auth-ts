export interface ChangePasswordRepository {
  change: (email: string, newPassword: string) => Promise<void>
}
