import uuid from 'uuid';
import Immutable from 'immutable';

function CsvDataEntry(state, action) {
  return Immutable.fromJS({
    type: 'Form',
    key: uuid.v4(),
    valid: action.valid,
    csvText: action.validation.find(input => input.name === 'csvText').value
  });
}

function CsvDataConfiguration(state, action) {
  return Immutable.fromJS({
    type: 'Form',
    key: uuid.v4(),
    valid: action.valid,
    columns: action.validation
  });
}

export default {CsvDataEntry, CsvDataConfiguration};