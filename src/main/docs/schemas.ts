import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'

import { accountSchema } from '@/main/docs/schemas/account'
import { httpErrors } from '@/main/docs/schemas/http'

export default {
  error: errorSchema,
  success: successSchema,
  ...accountSchema,
  ...httpErrors
}
