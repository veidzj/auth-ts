export const changeEmailPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Changes an account email',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changeEmailInput'
          }
        }
      }
    },
    responses: {
      204: {
        $ref: '#/components/changeEmailOutput'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      409: {
        $ref: '#/components/conflict'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
