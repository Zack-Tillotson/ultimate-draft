import React from 'react';
import { Provider } from 'react-redux';
import Store from '../../state/store';
import reducer from '../reducer';
import Page from './Page';

export default React.createClass({
  render() { 
    return (
      <Provider store={Store(reducer)}>
        <Page />
      </Provider>
    );
  }
});