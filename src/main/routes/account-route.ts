import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { adminAuth, userAuth } from '@/main/middlewares/auth'
import {
  SignUpControllerFactory,
  SignInControllerFactory,
  DeactivateAccountControllerFactory,
  ActivateAccountControllerrFactory,
  ChangeEmailControllerFactory,
  ChangePasswordControllerFactory,
  SendConfirmationCodeControllerFactory
} from '@/main/factories/controllers/commands'

export default (router: Router): void => {
  router.post('/v1/account/sign-up', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
  router.post('/v1/account/sign-in', ExpressRouteAdapter.adapt(SignInControllerFactory.makeSignInController()))
  router.put('/v1/account/deactivate/:accountId', adminAuth, ExpressRouteAdapter.adapt(DeactivateAccountControllerFactory.makeDeactivateAccountController()))
  router.put('/v1/account/activate/:accountId', adminAuth, ExpressRouteAdapter.adapt(ActivateAccountControllerrFactory.makeActivateAccountController()))
  router.put('/v1/account/change-email', userAuth, ExpressRouteAdapter.adapt(ChangeEmailControllerFactory.makeChangeEmailController()))
  router.put('/v1/account/change-password', userAuth, ExpressRouteAdapter.adapt(ChangePasswordControllerFactory.makeChangePasswordController()))
  router.post('/v1/account/send-confirmation-code', userAuth, ExpressRouteAdapter.adapt(SendConfirmationCodeControllerFactory.makeSendConfirmationCodeController()))
}
