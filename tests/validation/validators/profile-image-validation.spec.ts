import { faker } from '@faker-js/faker'

import { ProfileImageValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

describe('ProfileImageValidation', () => {
  let invalidUrl: ProfileImageValidation.Input
  let validUrl: ProfileImageValidation.Input
  let undefinedProfileImage: ProfileImageValidation.Input

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

  test('Should return an error if profile image is not a valid url', () => {
    const sut = new ProfileImageValidation()
    const error = sut.validate(invalidUrl)
    expect(error).toEqual(new ValidationError('Profile image must be a valid url'))
  })

  test('Should return null if profile image is not provided', () => {
    const sut = new ProfileImageValidation()
    const error = sut.validate(undefinedProfileImage)
    expect(error).toBeNull()
  })

  test('Should return null if profile image is a valid url', () => {
    const sut = new ProfileImageValidation()
    const error = sut.validate(validUrl)
    expect(error).toBeNull()
  })
})
