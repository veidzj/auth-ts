export const sendConfirmationCodeOutput = {
  description: 'Successfully sent a confirmation code',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/sendConfirmationCodeOutput'
      }
    }
  }
}
