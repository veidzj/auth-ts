export const changePasswordPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Changes an account password',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changePasswordInput'
          }
        }
      }
    },
    responses: {
      204: {
        $ref: '#/components/changePasswordOutput'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
