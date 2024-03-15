export const activateAccountPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Activates an account',
    parameters: [{
      in: 'path',
      name: 'accountId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        $ref: '#/components/activateAccountOutput'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
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
