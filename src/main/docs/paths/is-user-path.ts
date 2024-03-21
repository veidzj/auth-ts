export const isUserPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Check if account is user',
    responses: {
      204: {
        $ref: '#/components/isUserOutput'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
