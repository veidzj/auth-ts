import { faker } from '@faker-js/faker'

import { type AddAccountRepository } from '@/application/protocols/commands'

export const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.anytime().toISOString(),
  isActive: faker.datatype.boolean(),
  profileImage: faker.internet.url(),
  createdAt: faker.date.anytime()
})
