export default {
  type: "object",
  properties: {
    ingredients: {type: 'string'},
    count: {type: 'number'}
  },
  required: ['ingredients', 'count']
} as const;
