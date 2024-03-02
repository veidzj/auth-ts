import { apiKeyAuth } from '@/main/docs/components/api'
import { httpErrorsComponents } from '@/main/docs/components/http-errors'
import { accountComponents } from '@/main/docs/components/account'

export default {
  securitySchemes: {
    apiKeyAuth
  },
  ...httpErrorsComponents,
  ...accountComponents
}
