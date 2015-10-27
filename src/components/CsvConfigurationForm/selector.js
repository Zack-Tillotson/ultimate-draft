import columnTypes from './columnTypes';
import {id, baggageId} from './columnTypes';

function guessColumnType(name) {
  switch(name.toLowerCase()) {
    case 'id':
    case 'a':
      return id.name;
    case 'baggage id':
    case 'bag id':
    case 'b':
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

  const dataEntryKey = state.getIn(['wizard', 'DataEntry']);
  
  const players = state.getIn(['objects', dataEntryKey, 'data']).toJS();
  const fields = state.getIn(['objects', dataEntryKey, 'columns']).toJS();
  
  const columns = transformFieldMetadata(fields);

  return {players, columns};

}