import React from 'react';

import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import LoginForm from '../../LoginForm';
import DraftBaggages from '../DraftBaggages';

import firebase from '../../../firebase';
import styles from './styles';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    drafts: React.PropTypes.array.isRequired,
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    isAdmin: React.PropTypes.bool.isRequired,
    connection: React.PropTypes.object.isRequired,
  },

  userIsAdmin() {
    return this.props.isAdmin
  },

  adminSection() {
    return (
      <div className="adminOnly">
        <h5>Administrator</h5>
        <DraftBaggages {...this.props} />
      </div>
    )
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <LoginForm />
        {this.userIsAdmin() && this.adminSection()}
      </InlineCss>
    );
  }
});