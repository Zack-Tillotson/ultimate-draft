import papaparse from 'papaparse';

function attemptParse(csvString) {
  return papaparse.parse(csvString);
}

export default function(inputs) {
  return Object.keys(inputs).map(name => {
    const value = inputs[name];
    switch(name) {
      case 'csvText':
        const parseResult = attemptParse(value);
        const valid = parseResult.data.length > 0;
        return {name, value, valid};
    }
  })
}