import { ExpressMiddlewareAdapter } from '@/main/adapters'
import { VerifyConfirmationCodeMiddlewareFactory } from '@/main/factories/middlewares'

export const verifyConfirmationCode = ExpressMiddlewareAdapter.adapt(VerifyConfirmationCodeMiddlewareFactory.makeVerifyConfirmationCodeMiddleware())
