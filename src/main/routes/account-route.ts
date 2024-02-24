import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { SignUpControllerFactory } from '@/main/factories/controllers/commands'
import { SignInControllerFactory } from '@/main/factories/controllers/queries'

export default (router: Router): void => {
  router.post('/v1/account/sign-up', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
  router.post('/v1/account/sign-in', ExpressRouteAdapter.adapt(SignInControllerFactory.makeSignInController()))
}
