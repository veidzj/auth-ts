import { generateGUID } from '@/domain/helpers'

describe('generateGUID', () => {
  test('Should generate a valid GUID', () => {
    const sut = generateGUID()
    expect(sut).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  })

  test('Should generate unique GUIDs', () => {
    const sut1 = generateGUID()
    const sut2 = generateGUID()
    expect(sut1).not.toEqual(sut2)
  })
})
