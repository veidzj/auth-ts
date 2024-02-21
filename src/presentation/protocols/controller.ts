import { type HttpResponse } from '@/presentation/protocols'

export interface Controller<T = object> {
  handle: (request: T) => Promise<HttpResponse>
}
