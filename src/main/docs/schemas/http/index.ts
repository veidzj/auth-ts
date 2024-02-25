import { badRequestSchema } from './bad-request-schema'
import { conflictSchema } from './conflict-schema'

export const httpErrors = {
  badRequest: badRequestSchema,
  conflict: conflictSchema
}
