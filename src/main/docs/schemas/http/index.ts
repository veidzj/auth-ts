import { badRequestSchema } from './bad-request-schema'
import { conflictSchema } from './conflict-schema'
import { serverErrorSchema } from './server-error-schema'

export const httpErrors = {
  badRequest: badRequestSchema,
  conflict: conflictSchema,
  serverError: serverErrorSchema
}
