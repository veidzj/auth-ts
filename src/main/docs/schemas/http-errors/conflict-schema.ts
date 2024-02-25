export const conflictSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          default: 409
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
