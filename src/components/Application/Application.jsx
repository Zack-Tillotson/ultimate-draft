import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

import Header from '../Header';
import Footer from '../Footer';
import Body from '../Body';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <Header />
        <Body />
        <Footer />
      </InlineCss>
    );
  }
});