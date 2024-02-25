import { faker } from '@faker-js/faker'

import { ProfileImageValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): ProfileImageValidation => {
  return new ProfileImageValidation()
}

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

  test('Should throw ValidationError if profile image is not a valid url', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(invalidUrl)
    }).toThrow(new ValidationError('Profile image must be a valid url'))
  })

  test('Should not throw if profile image is not provided', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(undefinedProfileImage)
    }).not.toThrow()
  })

  test('Should not throw if profile image is a valid url', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(validUrl)
    }).not.toThrow()
  })
})
