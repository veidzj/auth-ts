export interface ChangePassword {
  change: (email: string, newPassword: string) => Promise<void>
}
