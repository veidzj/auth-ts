export interface ChangeProfileImage {
  change: (accountId: string, newProfileImage: string) => Promise<void>
}
