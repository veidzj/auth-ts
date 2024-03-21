export interface ChangeProfileImageRepository {
  change: (accountId: string, newProfileImage: string) => Promise<void>
}
