import { httpErrorsSchema } from '@/main/docs/schemas/http-errors'
import { accountSchema } from '@/main/docs/schemas/account'

export default {
  ...httpErrorsSchema,
  ...accountSchema
}
