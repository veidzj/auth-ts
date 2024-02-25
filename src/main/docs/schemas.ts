import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'

import { accountSchema, signUpInputSchema } from '@/main/docs/schemas/account'
import { badRequestSchema } from '@/main/docs/schemas/http'

export default {
  error: errorSchema,
  success: successSchema,
  account: accountSchema,
  signUpInput: signUpInputSchema,
  badRequest: badRequestSchema
}
