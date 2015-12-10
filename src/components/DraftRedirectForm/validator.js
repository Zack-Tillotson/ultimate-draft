export default function(inputs) {
  Object.keys(inputs).forEach(key => {
    const value = inputs[key];
    let valid = !/[\.\$\#\[\]\/]/.test(value)
    if(key == 'draftId' && !value) {
      valid = false;
    }
    inputs[key] = {value, valid};
  });
  return !Object.keys(inputs).find(key => !inputs[key].valid);
}