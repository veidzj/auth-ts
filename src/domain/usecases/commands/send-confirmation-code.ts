export interface SendConfirmationCode {
  send: (email: string) => Promise<string>
}
