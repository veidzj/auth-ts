import { accountPaths } from './paths/'

export default {
  '/v1/account/sign-up': accountPaths.signUpPath,
  '/v1/account/sign-in': accountPaths.signInPath,
  '/v1/account/deactivate/{accountId}': accountPaths.deactivateAccountPath,
  '/v1/account/activate/{accountId}': accountPaths.activateAccountPath,
  '/v1/account/change-email': accountPaths.changeEmailPath
}
