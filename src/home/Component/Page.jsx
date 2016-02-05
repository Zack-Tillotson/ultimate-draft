import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';
import firebase from '../../firebase';

import Application from '../../components/Application';
import LoginForm from '../../components/LoginForm';
import DraftRedirectForm from '../../components/DraftRedirectForm';
import DraftFaq from '../../components/draft/DraftFaq';

import selector from '../selector';
import actions from '../actions';
import formNames from '../formNames';
import styles from './styles.raw.less';

const Page = React.createClass({

  componentDidMount() {
    firebase.syncDraftList(this.props.dispatch.firebase);
  },

  render() {
    return (
      <Application footer={false} isLoggedIn={this.props.isLoggedIn}>
        <InlineCss stylesheet={styles} componentName="container">
          {!this.props.isLoggedIn && (
            <div>
              <div className="redirectForm">
                <h4>To begin please sign in with one of these providers</h4>
                <LoginForm />
              </div>
            </div>
          )}
          {this.props.isLoggedIn && (
            <DraftRedirectForm />
          )}
          <DraftFaq />
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(Page);