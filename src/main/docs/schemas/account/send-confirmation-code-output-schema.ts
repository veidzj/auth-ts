export const sendConfirmationCodeOutputSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          default: 200
        },
        message: {
          type: 'string'
        }
      },
      required: ['status', 'message']
    }
  },
  required: ['data']
}
