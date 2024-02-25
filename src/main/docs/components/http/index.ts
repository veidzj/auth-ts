import { badRequest } from './bad-request'
import { conflict } from './conflict'
import { serverError } from './server-error'

export const httpComponents = {
  badRequest,
  conflict,
  serverError
}
