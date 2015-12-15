
const dispatcher = (dispatch) => {
  return {
    dispatch: {
      requestRedirect(inputs) {
        window.location = `/draft/?id=${inputs.draftId}`;
      }      
    }
  }
}

export default { dispatcher };