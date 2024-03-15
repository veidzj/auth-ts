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
        insertedId: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      },
      required: ['status', 'insertedId', 'message']
    }
  },
  required: ['data']
}
