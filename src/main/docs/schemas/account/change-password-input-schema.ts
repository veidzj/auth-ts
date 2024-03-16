export const changePasswordInputSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    newPassword: {
      type: 'string'
    }
  },
  required: ['email', 'newPassword']
}
