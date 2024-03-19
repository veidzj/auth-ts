export interface VerifyConfirmationCode {
  verify: (accountId: string, confirmationCode: string) => Promise<void>
}
