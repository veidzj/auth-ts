export const errorSchema = {
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
  required: ['message', 'type', 'message']
}
