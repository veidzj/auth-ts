import { authSchema } from './auth-output-schema'
import { signUpInputSchema } from './sign-up-input-schema'

export const accountSchema = {
  authOutput: authSchema,
  signUpInput: signUpInputSchema
}
