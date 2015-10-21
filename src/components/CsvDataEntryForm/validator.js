import papaparse from 'papaparse';

function attemptParse(csvString) {
  return papaparse.parse(csvString);
}

export default function(inputs) {
  return inputs.map(input => {
    switch(input.name) {
      case 'csvText':
        const parseResult = attemptParse(input.value);
        const valid = parseResult.data.length > 0;
        return {...input, valid};
    }
  })
}