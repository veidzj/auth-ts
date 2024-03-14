export interface SendConfirmationCodeToEmail {
  send: (confirmationCode: string, email: string) => Promise<void>
}
