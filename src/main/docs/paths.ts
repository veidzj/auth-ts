import { signUpPath } from './paths/sign-up-path'
import { signInPath } from './paths/sign-in-path'
import { deactivateAccountPath } from './paths/deactivate-account-path'

export default {
  '/v1/account/sign-up': signUpPath,
  '/v1/account/sign-in': signInPath,
  '/v1/account/deactivate/{accountId}': deactivateAccountPath
}
