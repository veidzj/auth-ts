import { authSchema } from './auth-schema'
import { signUpInputSchema } from './sign-up-input-schema'

export const accountSchema = {
  auth: authSchema,
  signUpInput: signUpInputSchema
}
