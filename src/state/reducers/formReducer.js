import uuid from 'uuid';
import Immutable from 'immutable';

function CsvDataEntry(state, action) {
  return Immutable.fromJS({
    type: 'Form',
    key: uuid.v4(),
    valid: action.valid,
    csvString: action.validation.find(input => input.name === 'csvText').value
  });
}

export default {CsvDataEntry};