export const authSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    }
  },
  required: ['accessToken']
}
