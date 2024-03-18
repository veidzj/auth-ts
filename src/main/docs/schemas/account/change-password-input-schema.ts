export const changePasswordInputSchema = {
  type: 'object',
  properties: {
    newPassword: {
      type: 'string'
    }
  },
  required: ['newPassword']
}
