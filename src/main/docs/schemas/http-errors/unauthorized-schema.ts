export const unauthorizedSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          default: 401
        },
        type: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      },
      required: ['status', 'type', 'message']
    }
  },
  required: ['error']
}
