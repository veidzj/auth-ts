export const deactivateAccountPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    summary: 'Deactivates an account',
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
        $ref: '#/components/deactivateAccountOutput'
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
