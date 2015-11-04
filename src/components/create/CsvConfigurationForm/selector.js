import {createSelector} from 'reselect';
import columnTypes from '../../../columnTypes';
import {id, baggageId, vector, height, number} from '../../../columnTypes';
import papaparse from 'papaparse';

function guessColumnType(name) {
  switch(name.toLowerCase()) {
    case 'id':
    case 'a':
      return id.name;
    case 'baggage id':
    case 'bag id':
    case 'b':
      return baggageId.name;
    case 'vector':
    case 'vec':
    case 'c':
      return vector.name;
    case 'height':
      return height.name;
    case 'age':
    case 'yr started':
    case 'ath':
    case 'exp':
    case 'skill':
    case 'weeks missed':
      return number.name;
    default:
      return columnTypes[0].name;
  }
}

function cleanName(name) {
  return name.replace(/\.|\$|\#|\[|\]|\//, '_');
}

function transformFieldMetadata(fields) {
  return fields.map(originalName => {
    const name = cleanName(originalName);
    return {
      originalName,
      name,
      type: guessColumnType(name),
      visible: true,
      include: true
    };
  });
}

const name = (state, props) => props.name;
const wizard = (state) => state.wizard;
const forms = createSelector(wizard, (wizard) => wizard.get('forms'));
const form = createSelector(name, forms, (name, forms) => {
  const currentForm = forms.filter(form => form.get('name') == name).get(0);
  return currentForm ? currentForm.toJS() : {inputs: {}};
});

const csvText = (state) => state.wizard.get('forms').get(0).get('inputs').get('csvText').get('value');

export default createSelector(form, csvText, (form, csvText) => {

  const parseResult = papaparse.parse(csvText, {header: true});
  const players = parseResult.data;
  const columns = transformFieldMetadata(parseResult.meta.fields);

  form.inputs = columns.map((column, index) => {
    const input = Object.keys(form.inputs)
      .filter(key => form.inputs[key].originalName == column.originalName)
      .map(key => form.inputs[key])[0];
    return {...column, ...input};
  });

  return {...form, columns, players};
});
