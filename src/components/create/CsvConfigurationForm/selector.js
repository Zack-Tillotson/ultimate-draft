import {createSelector} from 'reselect';
import columnTypes from './columnTypes';
import {id, baggageId} from './columnTypes';
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
      visible: true
    };
  });
}

const name = (state, props) => props.name;
const wizard = (state) => state.wizard;
const forms = createSelector(wizard, (wizard) => wizard.get('forms'));
const form = createSelector(name, forms, (name, forms) => 
  forms.filter(form => form.get('name') === name).get(0).toJS()
);

const csvText = (state) => state.wizard.get('forms').get(0).get('inputs').get('csvText');

export default createSelector(form, csvText, (form, csvText) => {

  const parseResult = papaparse.parse(csvText, {header: true});
  const players = parseResult.data;
  const columns = transformFieldMetadata(parseResult.meta.fields);

  return {...form, columns, players};
});