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
    firebase.syncDraftList(this.props.dispatch.firebase);
  },

  render() {
    return (
      <Application footer={false} isLoggedIn={this.props.isLoggedIn}>
        <InlineCss stylesheet={styles} componentName="container">
          <div className="callToAction">
            Forget shuffling stacks of papers and big spreadsheets!
          </div>
          <div className="highlights">
            <div className="highlight">
              <div className="highlightTitle">
                Draft Order
              </div>
              <div className="highlightImage">
                <img src="/assets/draftOrder.png" alt="Draft Order" />
              </div>
              <div className="highlightExtras">
                The team currently drafting is shown first, your team is highlighted.
              </div>
            </div>
            <div className="highlight">
              <div className="highlightTitle">
                Select A Team
              </div>
              <div className="highlightImage">
                <img src="/assets/selectTeam.png" alt="Select Your Team" />
              </div>
              <div className="highlightExtras">
                Observer mode shows you the current team or select a team to stay on their perspective.
              </div>
            </div>
            <div className="highlight">
              <div className="highlightTitle">
                Players Information
              </div>
              <div className="highlightImage">
                <img src="/assets/playerInformation.png" alt="Players and Teams" />
              </div>
              <div className="highlightExtras">
                Filter by players who are draftable, sort by any column, and click a player for more detail.
              </div>
            </div>
          </div>
          <div className="redirectForm">
            <h3>Start Drafting</h3>
            {!this.props.isLoggedIn && (
              <div>
                <h3>To begin please sign in with one of these providers</h3>
                <LoginForm />
              </div>
            )}
            {this.props.isLoggedIn && (
              <DraftRedirectForm />
            )}
          </div>
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(Page);