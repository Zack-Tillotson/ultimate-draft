export default function(inputs) {
  Object.keys(inputs).forEach(key => {
    const value = inputs[key];
    let valid = true;
    switch(key) {
      case 'csvText':
        valid = !!value;
        break;
    }
    inputs[key] = {value, valid};
  });
  return !Object.keys(inputs).find(key => !inputs[key].valid);
}