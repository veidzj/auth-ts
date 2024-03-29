import { signUpInputSchema } from './sign-up-input-schema'
import { signUpOutputSchema } from './sign-up-output-schema'
import { signInInputSchema } from './sign-in-input-schema'
import { signInOutputSchema } from './sign-in-output-schema'
import { changeEmailInputSchema } from './change-email-input-schema'
import { changePasswordInputSchema } from './change-password-input-schema'
import { changeProfileImageInputSchema } from './change-profile-image-input-schema'
import { sendConfirmationCodeInputSchema } from './send-confirmation-code-input-schema'
import { sendConfirmationCodeOutputSchema } from './send-confirmation-code-output-schema'

export const accountSchema = {
  signUpInput: signUpInputSchema,
  signUpOutput: signUpOutputSchema,
  signInInput: signInInputSchema,
  signInOutput: signInOutputSchema,
  changeEmailInput: changeEmailInputSchema,
  changePasswordInput: changePasswordInputSchema,
  changeProfileImageInput: changeProfileImageInputSchema,
  sendConfirmationCodeInput: sendConfirmationCodeInputSchema,
  sendConfirmationCodeOutput: sendConfirmationCodeOutputSchema
}
