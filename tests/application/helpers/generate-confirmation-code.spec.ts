import { GenerateConfirmationCode } from '@/application/helpers'

describe('GenerateConfirmationCode', () => {
  test('Should generate a code of default length 6', () => {
    const sut = GenerateConfirmationCode
    const code = sut.generate()
    expect(code).toHaveLength(6)
  })

  test('Should generate a numeric code', () => {
    const sut = GenerateConfirmationCode
    const code = sut.generate()
    expect(code).toMatch(/^\d+$/)
  })

  test.each([1, 5, 10, 20])('Should generate a code of length %i', (length) => {
    const sut = GenerateConfirmationCode
    const code = sut.generate(length)
    expect(code).toHaveLength(length)
    expect(code).toMatch(/^\d+$/)
  })
})
