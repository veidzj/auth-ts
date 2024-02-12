import { faker } from '@faker-js/faker'

import { DbAddAccount } from '@/application/usecases/commands'
import { type AddAccountRepository } from '@/application/protocols/commands'
import { type AddAccount } from '@/domain/usecases/commands'

const mockInput = (): AddAccount.Input => ({
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.anytime(),
  profileImage: faker.internet.url()
})

describe('DbAddAccount', () => {
  test('Should call AddAccountRepository with correct values', async() => {
    class AddAccountRepositorySpy implements AddAccountRepository {
      public input: AddAccountRepository.Input

      public async add(input: AddAccountRepository.Input): Promise<void> {
        this.input = input
      }
    }
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbAddAccount(addAccountRepositorySpy)
    const input = mockInput()
    await sut.add(input)
    expect(addAccountRepositorySpy.input).toEqual(input)
  })
})
