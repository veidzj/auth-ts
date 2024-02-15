import { faker } from '@faker-js/faker'

import { ProfileImageValidation } from '@/validation/validators'

describe('ProfileImageValidation', () => {
  let invalidUrl: { profileImage: string }
  let validUrl: { profileImage: string }
  let undefinedProfileImage: { profileImage: undefined }

  beforeAll(() => {
    invalidUrl = {
      profileImage: faker.string.alpha(12)
    }
    undefinedProfileImage = {
      profileImage: undefined
    }
    validUrl = {
      profileImage: faker.internet.url()
    }
  })

  test('Should add an error if profile image is not a valid url', () => {
    const sut = new ProfileImageValidation()
    const errors = sut.validate(invalidUrl)
    expect(errors[0]).toBe('Profile image must be a valid url')
  })

  test('Should not add an error if profile image is not provided', () => {
    const sut = new ProfileImageValidation()
    const errors = sut.validate(undefinedProfileImage)
    expect(errors).toEqual([])
  })

  test('Should not add an error if profile image is a valid url', () => {
    const sut = new ProfileImageValidation()
    const errors = sut.validate(validUrl)
    expect(errors).toEqual([])
  })
})
