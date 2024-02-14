import { faker } from '@faker-js/faker'

import { FullNameValidation } from '@/validation/validators'

describe('FullNameValidation', () => {
  let shortFullName: string
  let longFullName: string

  beforeAll(() => {
    shortFullName = faker.string.alpha({ length: { min: 1, max: 2 } })
    longFullName = faker.string.alpha({ length: 51 })
  })

  test('Should add an error if full name is less than 3 characters long', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(shortFullName)
    expect(errors[0]).toBe('Full name must be between 3 and 50 characters long')
  })

  test('Should add an error if full name is greater than 50 characters long', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(longFullName)
    expect(errors[0]).toBe('Full name must be between 3 and 50 characters long')
  })
})
