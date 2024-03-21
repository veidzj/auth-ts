export const changeProfileImagePath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Changes an account profile image',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changeProfileImageInput'
          }
        }
      }
    },
    responses: {
      204: {
        $ref: '#/components/changeProfileImageOutput'
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
