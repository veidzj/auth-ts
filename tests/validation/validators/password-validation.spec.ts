import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'

describe('PasswordValidation', () => {
  let shortPassword: string

  beforeAll(() => {
    shortPassword = faker.string.alpha({ length: { min: 1, max: 5 } })
  })

  test('Should add an error if password is less than 6 characters long', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(shortPassword)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
  })
})
