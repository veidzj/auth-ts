export const serverErrorSchema = {
  allOf: [
    { $ref: '#/schemas/error' },
    {
      properties: {
        error: {
          properties: {
            status: { type: 'number', enum: [500] }
          }
        }
      }
    }
  ]
}
