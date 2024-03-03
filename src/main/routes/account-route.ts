import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { adminAuth } from '@/main/middlewares/auth'
import { SignUpControllerFactory, DeactivateAccountControllerFactory, ActivateAccountControllerrFactory } from '@/main/factories/controllers/commands'
import { SignInControllerFactory } from '@/main/factories/controllers/queries'

export default (router: Router): void => {
  router.post('/v1/account/sign-up', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
  router.post('/v1/account/sign-in', ExpressRouteAdapter.adapt(SignInControllerFactory.makeSignInController()))
  router.put('/v1/account/deactivate/:accountId', adminAuth, ExpressRouteAdapter.adapt(DeactivateAccountControllerFactory.makeDeactivateAccountController()))
  router.put('/v1/account/activate/:accountId', adminAuth, ExpressRouteAdapter.adapt(ActivateAccountControllerrFactory.makeActivateAccountController()))
}
