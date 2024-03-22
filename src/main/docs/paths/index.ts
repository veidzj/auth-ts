import { signUpPath } from './sign-up-path'
import { signInPath } from './sign-in-path'
import { activateAccountPath } from './activate-account-path'
import { deactivateAccountPath } from './deactivate-account-path'
import { changeEmailPath } from './change-email-path'
import { changePasswordPath } from './change-password-path'
import { changeProfileImagePath } from './change-profile-image-path'
import { sendConfirmationCodePath } from './send-confirmation-code-path'
import { isUserPath } from './is-user-path'
import { isAdminPath } from './is-admin-path'

export const accountPaths = {
  signUpPath,
  signInPath,
  activateAccountPath,
  deactivateAccountPath,
  changeEmailPath,
  changePasswordPath,
  changeProfileImagePath,
  sendConfirmationCodePath,
  isUserPath,
  isAdminPath
}
