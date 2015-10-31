function validateModalInput(modal, name, value) {
  switch(modal) {
    case modalNames.chooseCurrentTeam:
      switch(name) {
        case 'teamId':
          return value != -1;
      }
      break;
    case filterColumns:
      break;
    case filterRows:
      break;
    case draftPlayer:
      switch(name) {
        case 'teamId':
          return value != -1;
        case 'playerId':
          return !!value;
      }
      break;
    case undraftPlayer:
      break;
  }
  return true;
}

export default {
  validate(modal, inputs) {
    const ret = {};
    inputs = Object.keys(inputs).map(name => {
      const value = inputs[name];
      const valid = validateModalInput(modal, name, value);
      const input = {value, valid};
      ret[name] = input;
      return input;
    });
    const valid = inputs.filter(input => !input.valid).length === 0;
    return {inputs, valid};
  }
}