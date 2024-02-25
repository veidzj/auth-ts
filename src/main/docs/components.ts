import { badRequest, conflict, serverError } from '@/main/docs/components/http'
import { accountComponents } from '@/main/docs/components/account'

export default {
  ...accountComponents,
  badRequest,
  conflict,
  serverError
}
