export const serverErrorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          default: 500
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
