import { badRequestSchema } from './bad-request-schema'
import { unauthorizedSchema } from './unauthorized-schema'
import { forbiddenSchema } from './forbidden-schema'
import { notFoundSchema } from './not-found-schema'
import { conflictSchema } from './conflict-schema'
import { serverErrorSchema } from './server-error-schema'

export const httpErrorsSchema = {
  badRequest: badRequestSchema,
  unauthorized: unauthorizedSchema,
  forbidden: forbiddenSchema,
  notFound: notFoundSchema,
  conflict: conflictSchema,
  serverError: serverErrorSchema
}
