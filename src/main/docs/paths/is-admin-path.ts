export const isAdminPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Check if account is admin',
    responses: {
      204: {
        $ref: '#/components/isAdminOutput'
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
