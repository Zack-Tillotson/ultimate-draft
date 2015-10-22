export const id = {name: 'ID', description: 'The unique player ID', unique: true, required: true};
export const baggageId = {name: 'Baggage ID', description: 'The ID of this player\'s baggage', 
  unique: true, required: true};

export default [
  {name: 'String', description: 'Words and such', unique: false, required: false},
  {name: 'Boolean', description: 'Exists or not', unique: false, required: false},
  {name: 'Number', description: 'A numerical value', unique: false, required: false},
  id, baggageId
];