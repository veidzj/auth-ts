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
      200: {
        $ref: '#/schemas/changeEmailOutput'
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
