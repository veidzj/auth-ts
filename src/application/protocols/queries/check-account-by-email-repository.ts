export class CheckAccountByEmailRepository {
  check: (email: string) => Promise<boolean>
}
