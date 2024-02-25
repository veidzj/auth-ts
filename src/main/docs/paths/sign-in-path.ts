export const signInPath = {
  post: {
    tags: ['Account'],
    summary: 'Authenticate an user account',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signInInput'
          }
        }
      }
    },
    responses: {
      200: {
        $ref: '#/components/authOutput'
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
