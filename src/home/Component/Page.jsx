import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';
import firebase from '../../firebase';

import Application from '../../components/Application';
import LoginForm from '../../components/LoginForm';
import DraftRedirectForm from '../../components/DraftRedirectForm';

import selector from '../selector';
import actions from '../actions';
import formNames from '../formNames';
import styles from './styles.raw.less';

const Page = React.createClass({

  componentDidMount() {
    const ref = firebase.connect();
    const auth = ref.onAuth(this.props.dispatch.triggerLogin);
  },

  render() {
    return (
      <Application footer={false}>
        <InlineCss stylesheet={styles} componentName="container">
          {!this.props.isLoggedIn && (
            <div>
              <h3>Sign in to begin draft</h3>
              <p>We support these three major providers</p>
            </div>
          )}
          <LoginForm />
          {this.props.isLoggedIn && (
            <DraftRedirectForm />
          )}
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(Page);