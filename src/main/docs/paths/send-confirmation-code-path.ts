export const sendConfirmationCodePath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Sends a confirmation code to email',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/sendConfirmationCodeInput'
          }
        }
      }
    },
    responses: {
      200: {
        $ref: '#/schemas/sendConfirmationCodeOutput'
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
