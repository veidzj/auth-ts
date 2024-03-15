export interface CheckAccountByIdRepository {
  check: (id: string) => Promise<boolean>
}
