import React from 'react';
import { Provider } from 'react-redux';

import Application from '../Application';
import store from '../../state/store.js';

export default React.createClass({
  render() { 
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
});