import { authSchema } from './auth-output-schema'
import { signUpInputSchema } from './sign-up-input-schema'
import { signInInputSchema } from './sign-in-input-schema'

export const accountSchema = {
  authOutput: authSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema
}
