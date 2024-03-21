export const changeProfileImageInputSchema = {
  type: 'object',
  properties: {
    newProfileImage: {
      type: 'string'
    }
  },
  required: ['newProfileImage']
}
