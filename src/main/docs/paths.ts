import { signUpPath, signInPath, deactivateAccountPath, activateAccountPath } from '@/main/docs/paths/'

export default {
  '/v1/account/sign-up': signUpPath,
  '/v1/account/sign-in': signInPath,
  '/v1/account/deactivate/{accountId}': deactivateAccountPath,
  '/v1/account/activate/{accountId}': activateAccountPath
}
