import { errorSchema } from '@/main/docs/schemas/error-schema'

import { accountSchema } from '@/main/docs/schemas/account'
import { httpErrorsSchema } from '@/main/docs/schemas/http-errors'

export default {
  error: errorSchema,
  ...accountSchema,
  ...httpErrorsSchema
}
