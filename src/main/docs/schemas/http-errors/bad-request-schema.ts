export const badRequestSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          default: 400
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
