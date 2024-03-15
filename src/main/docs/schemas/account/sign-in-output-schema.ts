export const signInOutputSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          default: 200
        },
        accessToken: {
          type: 'string'
        }
      },
      required: ['status', 'accessToken']
    }
  },
  required: ['data']
}
