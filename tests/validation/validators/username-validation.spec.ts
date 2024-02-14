import { faker } from '@faker-js/faker'

import { UsernameValidation } from '@/validation/validators'

describe('UsernameValidation', () => {
  let shortUsername: string

  beforeAll(() => {
    shortUsername = faker.string.alpha({ length: { min: 1, max: 2 } })
  })

  test('Should return an error if username is less than 3 characters long', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(shortUsername)
    expect(errors[0]).toBe('Username must be at least 3 characters long')
  })
})
