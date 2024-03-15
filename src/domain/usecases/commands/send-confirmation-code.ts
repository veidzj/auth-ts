export interface SendConfirmationCode {
  send: (email: string, accountId: string) => Promise<string>
}
