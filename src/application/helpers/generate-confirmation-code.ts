import crypto from 'crypto'

export class GenerateConfirmationCode {
  public static generate(length: number = 6): string {
    let code = ''
    for (let i = 0; i < length; i++) {
      code += crypto.randomInt(10).toString()
    }
    return code
  }
}
