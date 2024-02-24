import jwt from 'jsonwebtoken'

import { faker } from '@faker-js/faker'
import { JwtAdapter } from '@/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return jwtToken
  }
}))

const jwtSecret: string = faker.string.uuid()
const plainText: string = faker.string.uuid()
const jwtToken: string = faker.string.uuid()

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(jwtSecret)
}

describe('JwtAdapter', () => {
  describe('Encrypter', () => {
    test('Should call sign with correct values', async() => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(plainText)
      expect(signSpy).toHaveBeenCalledWith({ id: plainText }, jwtSecret, { expiresIn: '1h' })
    })

    test('Should throw if sign throws', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt(plainText)
      await expect(promise).rejects.toThrow()
    })

    test('Should return an accessToken on success', async() => {
      const sut = makeSut()
      const accessToken = await sut.encrypt(plainText)
      expect(accessToken).toBe(jwtToken)
    })
  })
})
