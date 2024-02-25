export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'number'
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
