import { errorSchema } from '@/main/docs/schemas/error-schema'

import { accountSchema } from '@/main/docs/schemas/account'
import { httpErrors } from '@/main/docs/schemas/http'

export default {
  error: errorSchema,
  ...accountSchema,
  ...httpErrors
}
