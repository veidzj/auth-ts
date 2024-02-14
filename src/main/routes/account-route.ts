import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { SignUpControllerFactory } from '@/main/factories/controllers/commands'

export default (router: Router): void => {
  router.post('/account/sign-up', ExpressRouteAdapter.adapt(SignUpControllerFactory.makeSignUpController()))
}
