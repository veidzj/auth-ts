import { type HttpResponse } from '@/presentation/protocols'
import { InternalServerError } from '@/presentation/errors'

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

  public static serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: new InternalServerError()
    }
  }
}
