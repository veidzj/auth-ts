export const conflictSchema = {
  allOf: [
    { $ref: '#/schemas/error' },
    {
      properties: {
        error: {
          properties: {
            status: { type: 'number', enum: [409] }
          }
        }
      }
    }
  ]
}
