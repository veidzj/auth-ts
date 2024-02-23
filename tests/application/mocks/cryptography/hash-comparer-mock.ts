import { type HashComparer } from '@/application/protocols/cryptography'

export class HashComparerSpy implements HashComparer {
  public plainText: string
  public digest: string
  public output: boolean = true

  public async compare(plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText
    this.digest = digest
    return this.output
  }
}
