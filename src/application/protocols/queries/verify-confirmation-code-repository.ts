export interface VerifyConfirmationCodeRepository {
  verify: (accountId: string, confirmationCode: string) => Promise<boolean>
}
