import React from 'react';
import InlineCss from 'react-inline-css';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles';

export default React.createClass({

  propTypes: {
    footer: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      footer: true
    };
  },

  getChildren() {
    return this.props.children;
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <Header isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} tutorial={this.props.tutorial} />
        {this.getChildren()}
        {this.props.footer && (<Footer />)}
      </InlineCss>
    );
  }
});