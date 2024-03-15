import { GenerateConfirmationCode } from '@/application/helpers'

describe('GenerateConfirmationCode', () => {
  test('Should generate a code of default length 6', () => {
    const code = GenerateConfirmationCode.generate()

    expect(code).toHaveLength(6)
  })

  test('Should generate a numeric code', () => {
    const code = GenerateConfirmationCode.generate()

    expect(code).toMatch(/^\d+$/)
  })

  test.each([1, 5, 10, 20])('Should generate a code of length %i', (length) => {
    const code = GenerateConfirmationCode.generate(length)

    expect(code).toHaveLength(length)
    expect(code).toMatch(/^\d+$/)
  })

  test('Should generate unique codes on subsequent calls', () => {
    const codes = new Set()

    for (let i = 0; i < 100; i++) {
      codes.add(GenerateConfirmationCode.generate())
    }

    expect(codes.size).toBe(100)
  })
})
