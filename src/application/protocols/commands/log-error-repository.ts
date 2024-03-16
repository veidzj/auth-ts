export interface LogErrorRepository {
  log: (stack: string) => Promise<string>
}
