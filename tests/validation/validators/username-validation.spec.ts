import { faker } from '@faker-js/faker'

import { UsernameValidation } from '@/validation/validators'

describe('UsernameValidation', () => {
  let shortUsername: string
  let longUsername: string
  let usernameStartsWithNumber: string
  let usernameWithSpecialCharacter: string

  beforeAll(() => {
    shortUsername = faker.string.alpha({ length: { min: 1, max: 2 } })
    longUsername = faker.string.alpha({ length: 17 })
    usernameStartsWithNumber = faker.string.numeric() + faker.string.alpha(2)
    usernameWithSpecialCharacter = faker.string.alpha() + faker.string.symbol(15)
  })

  test('Should add an error if username is less than 3 characters long', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(shortUsername)
    expect(errors[0]).toBe('Username must be between 3 and 16 characters long')
  })

  test('Should add an error if username is greater than 16 characters long', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(longUsername)
    expect(errors[0]).toBe('Username must be between 3 and 16 characters long')
  })

  test('Should add an error if username starts with a number', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(usernameStartsWithNumber)
    expect(errors[0]).toBe('Username must start with a letter')
  })

  test('Should add an error if username contains a special character', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(usernameWithSpecialCharacter)
    expect(errors[0]).toBe('Username can only contain letters, digits, underscore, and hyphen')
  })
})
