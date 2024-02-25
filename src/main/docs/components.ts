import { badRequest, conflict, serverError } from '@/main/docs/components/http'
import { auth } from '@/main/docs/components/account'

export default {
  auth,
  badRequest,
  conflict,
  serverError
}
