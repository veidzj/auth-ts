import { faker } from '@faker-js/faker'

import { type Encrypter } from '@/application/protocols/cryptography'

export class EncrypterSpy implements Encrypter {
  public plainText: string
  public cipherText: string = faker.string.uuid()

  public async encrypt(plainText: string): Promise<string> {
    this.plainText = plainText
    return this.cipherText
  }
}
