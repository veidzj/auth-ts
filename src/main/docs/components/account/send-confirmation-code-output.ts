export const sendConfirmationCodeOutput = {
  description: 'Sucessfully sent a confirmation code',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/sendConfirmationCodeOutput'
      }
    }
  }
}
