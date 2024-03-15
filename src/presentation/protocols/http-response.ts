export interface HttpResponse {
  statusCode: number
  body: {
    name?: string
    message?: string
  } | null
}
