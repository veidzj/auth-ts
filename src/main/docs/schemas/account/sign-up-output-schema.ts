export const signUpOutputSchema = {
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
        accessToken: {
          type: 'string'
        }
      },
      required: ['status', 'insertedId', 'accessToken']
    }
  },
  required: ['data']
}
