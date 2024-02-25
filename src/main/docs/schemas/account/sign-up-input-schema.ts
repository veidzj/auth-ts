export const signUpInputSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    fullName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    birthdate: {
      type: 'string'
    },
    profileImage: {
      type: 'string'
    }
  },
  required: ['username', 'fullName', 'email', 'password', 'birthdate']
}
