import { type HttpResponse } from '@/presentation/protocols'

export interface Decorator<T = object> {
  handle: (request: T) => Promise<HttpResponse>
}
