import { type HttpResponse } from '@/presentation/protocols'

export interface Middleware<T = object> {
  handle: (request: T) => Promise<HttpResponse>
}
