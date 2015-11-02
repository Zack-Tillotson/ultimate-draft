import QueryString from 'query-string';
import {id, baggageId} from '../columnTypes';

export default {

  getFirebaseId() {
    const params = QueryString.parse(location.search);
    return params.id;
  },

  getPlayerId(player, columns) {
    const idColumn = columns.find(column => column.type === id.name);
    return player[idColumn.name];  
  },

  getBaggageId(player, columns) {
    const idColumn = columns.find(column => column.type === baggageId.name);
    return player[idColumn.name];  
  }

}