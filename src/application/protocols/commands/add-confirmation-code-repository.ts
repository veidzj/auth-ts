export interface AddConfirmationCodeRepository {
  add: (confirmationCode: string) => Promise<string>
}
