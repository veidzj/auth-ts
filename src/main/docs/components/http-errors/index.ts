import { badRequest } from './bad-request'
import { unauthorized } from './unauthorized'
import { notFound } from './not-found'
import { conflict } from './conflict'
import { serverError } from './server-error'

export const httpErrorsComponents = {
  badRequest,
  unauthorized,
  notFound,
  conflict,
  serverError
}
