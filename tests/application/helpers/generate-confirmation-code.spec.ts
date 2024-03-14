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
})
