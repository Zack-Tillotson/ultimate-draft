import modalNames from './modalNames';

function validateModalInput(modal, name, value) {
  switch(modal) {
    case modalNames.chooseViewTeam:
      switch(name) {
        case 'teamId':
          return value != -1;
      }
      break;
    case modalNames.filterColumns:
      break;
    case modalNames.filterRows:
      break;
    case modalNames.draftPlayer:
      switch(name) {
        case 'teamId':
          return value != -1;
        case 'playerId':
          return !!value;
      }
      break;
    case modalNames.filterRows:
      switch(name) {
        case 'viewOtherTeam':
        case 'viewYourTeam':
        case 'viewUndraftable':
          return true;
      }
      break;
    case modalNames.undraftPlayer:
      break;
  }
  return true;
}

export default {
  validate(modal, inputs) {
    const ret = inputs instanceof Array ? [] : {};
    inputs = Object.keys(inputs).map(name => {
      const value = inputs[name];
      const valid = validateModalInput(modal, name, value);
      const input = {value, valid};
      ret[name] = input;
      return input;
    });
    const valid = inputs.filter(input => !input.valid).length === 0;
    return {inputs: ret, valid};
  }
}