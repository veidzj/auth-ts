import { faker } from '@faker-js/faker'

import { ProfileImageValidation } from '@/validation/validators'

describe('ProfileImageValidation', () => {
  let invalidUrl: { profileImage: string }

  beforeAll(() => {
    invalidUrl = {
      profileImage: faker.string.alpha(12)
    }
  })

  test('Should add an error if profile image is not a valid url', () => {
    const sut = new ProfileImageValidation()
    const errors = sut.validate(invalidUrl)
    expect(errors[0]).toBe('Profile image must be a valid url')
  })

  test('Should not add an error if profile image is not provided', () => {
    const sut = new ProfileImageValidation()
    const errors = sut.validate({ profileImage: undefined })
    expect(errors).toEqual([])
  })
})
