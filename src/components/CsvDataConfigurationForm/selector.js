import papaparse from 'papaparse';
import columnTypes from './columnTypes';
import {id, baggageId} from './columnTypes';

function guessColumnType(name) {
  switch(name.toLowerCase()) {
    case 'id':
      return id.name;
    case 'baggage id':
    case 'bag id':
      return baggageId.name;
    default:
      return columnTypes[0].name;
  }
}

function transformFieldMetadata(fields) {
  return fields.map(name => {
    return {
      name,
      type: guessColumnType(name)
    };
  });
}

export default (state) => {
  
  const csvText = state.getIn(
    ['objects', state.getIn(['wizard', 'CsvDataEntry']), 'csvText']
  );

  const parseResult = papaparse.parse(csvText, {header: true});

  const players = parseResult.data;
  const columns = transformFieldMetadata(parseResult.meta.fields);

  return {players, columns};

} 