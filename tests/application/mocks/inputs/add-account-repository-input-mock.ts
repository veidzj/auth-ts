import { faker } from '@faker-js/faker'

import { type AddAccountRepository } from '@/application/protocols/commands'

export const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.anytime().toISOString(),
  profileImage: faker.internet.url(),
  isActive: faker.datatype.boolean(),
  roles: [faker.word.words()],
  createdAt: faker.date.anytime()
})
