import actions from '../../state/actions';
import validator from './validator';
import papaparse from 'papaparse';

const creators = {
  submitForm(info) {
    return {
      type: actions.submitForm, 
      formName: 'DataEntry',
      ...info
    };
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      submitForm(inputs) {
        const csvText = inputs.csvText;
        const valid = validator(csvText);
        let data = [];
        let columns = [];
        if(valid) {
          const parseResult = papaparse.parse(inputs.csvText, {header: true});
          data = parseResult.data;
          columns = parseResult.meta.fields;
        }
        dispatch(creators.submitForm({valid, csvText, data, columns}));
      }
    }
  }
}

export default { creators, dispatcher };