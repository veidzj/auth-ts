import { SignUpController } from '@/presentation/controllers'
import { type AddAccount } from '@/domain/usecases'

const mockRequest = (): SignUpController.Request => ({
  username: '',
  fullName: '',
  email: '',
  password: '',
  birthdate: '',
  profileImage: ''
})

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async() => {
    class AddAccountSpy implements AddAccount {
      public input: AddAccount.Input
      public output: AddAccount.Output

      public async add(input: AddAccount.Input): Promise<AddAccount.Output> {
        this.input = input
        return this.output
      }
    }
    const addAccountSpy = new AddAccountSpy()
    const sut = new SignUpController(addAccountSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.input).toEqual(request)
  })
})
