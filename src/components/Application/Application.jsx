import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

import Header from '../Header';
import Footer from '../Footer';

export default React.createClass({
  getChildren() {
    return this.props.children;
  },
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <Header />
        {this.getChildren()}
        <Footer />
      </InlineCss>
    );
  }
});