import { faker } from '@faker-js/faker'

import { type Decrypter } from '@/application/protocols/cryptography'

export class DecrypterSpy implements Decrypter {
  public cipherText: string
  public plainText: string = faker.internet.password()

  public async decrypt(cipherText: string): Promise<string> {
    this.cipherText = cipherText
    return this.plainText
  }
}
