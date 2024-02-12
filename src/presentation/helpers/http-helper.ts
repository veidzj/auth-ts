import { type HttpResponse } from '@/presentation/protocols'

export class HttpHelper {
  public static ok(data: object): HttpResponse {
    return {
      statusCode: 200,
      body: data
    }
  }
}
