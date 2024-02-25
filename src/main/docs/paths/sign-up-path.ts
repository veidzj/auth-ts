export const signUpPath = {
  post: {
    tags: ['Account'],
    summary: 'Adds an user account',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpInput'
          }
        }
      }
    },
    responses: {
      200: {
        $ref: '#/components/auth'
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
