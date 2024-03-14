export interface AddConfirmationCodeRepository {
  add: (confirmationCode: string) => Promise<void>
}
