import { type HttpResponse } from '@/presentation/protocols'

export class HttpHelper {
  public static ok(data: object): HttpResponse {
    return {
      statusCode: 200,
      body: data
    }
  }

  public static badRequest(data: object): HttpResponse {
    return {
      statusCode: 400,
      body: data
    }
  }
}
