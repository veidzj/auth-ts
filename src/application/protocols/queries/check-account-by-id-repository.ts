export class CheckAccountByIdRepository {
  check: (id: string) => Promise<boolean>
}
