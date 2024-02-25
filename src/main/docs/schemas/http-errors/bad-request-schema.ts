export const badRequestSchema = {
  allOf: [
    { $ref: '#/schemas/error' },
    {
      properties: {
        error: {
          properties: {
            status: { type: 'number', enum: [400] }
          }
        }
      }
    }
  ]
}
