export interface AddConfirmationCodeRepository {
  add: (confirmationCode: string, accountId: string) => Promise<string>
}
