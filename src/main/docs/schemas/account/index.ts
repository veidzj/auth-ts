import { authSchema } from './auth-output-schema'
import { signUpInputSchema } from './sign-up-input-schema'
import { signInInputSchema } from './sign-in-input-schema'
import { deactivateAccountOutputSchema } from './deactivate-account-output-schema'
import { activateAccountOutputSchema } from './activate-account-output-schema'

export const accountSchema = {
  authOutput: authSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  deactivateAccountOutput: deactivateAccountOutputSchema,
  activateAccountOutput: activateAccountOutputSchema
}
