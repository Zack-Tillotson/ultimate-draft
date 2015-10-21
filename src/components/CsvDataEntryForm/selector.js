export default (state) => {
  state = state.toJS();
  return {
    validation: state.objects[state.wizard.CsvDataEntry]
  };
} 