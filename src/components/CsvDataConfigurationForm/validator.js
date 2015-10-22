  
export default function(inputs) {
  return inputs.map((column, index) => {
    const valid = !!column.name && !!column.type;
    return {...column, valid};
  });
}