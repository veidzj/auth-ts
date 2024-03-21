import { accountPaths } from './paths/'

export default {
  '/v1/account/sign-up': accountPaths.signUpPath,
  '/v1/account/sign-in': accountPaths.signInPath,
  '/v1/account/deactivate/{accountId}': accountPaths.deactivateAccountPath,
  '/v1/account/activate/{accountId}': accountPaths.activateAccountPath,
  '/v1/account/change-email': accountPaths.changeEmailPath,
  '/v1/account/change-password': accountPaths.changePasswordPath,
  '/v1/account/change-profile-image': accountPaths.changeProfileImagePath,
  '/v1/account/send-confirmation-code': accountPaths.sendConfirmationCodePath,
  '/v1/account/is-user': accountPaths.isUserPath
}
