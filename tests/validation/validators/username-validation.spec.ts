import { UsernameValidation } from '@/validation/validators'

describe('UsernameValidation', () => {
  test('Should return an error if username is less than 3 characters long', () => {
    const sut = new UsernameValidation()
    const error = sut.validate('')
    expect(error).toEqual(new Error('Username must be at least 3 characters long'))
  })
})
