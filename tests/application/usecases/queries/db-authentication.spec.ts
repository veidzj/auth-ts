import { faker } from '@faker-js/faker'

import { DbAuthentication } from '@/application/usecases/queries'
import { type GetAccountByEmailRepository } from '@/application/protocols/queries'
import { type Authentication } from '@/domain/usecases/queries'

const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('DbAuthentication', () => {
  describe('GetAccountByEmailRepository', () => {
    test('Should call GetAccountByEmailRepository with correct email', async() => {
      class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
        public email: string
        public output: GetAccountByEmailRepository.Output

        public async get(email: string): Promise<GetAccountByEmailRepository.Output> {
          this.email = email
          return this.output
        }
      }
      const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
      const sut = new DbAuthentication(getAccountByEmailRepositorySpy)
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(getAccountByEmailRepositorySpy.email).toBe(authenticationInput.email)
    })
  })
})
