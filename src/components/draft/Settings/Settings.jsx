import React from 'react';

import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import LoginForm from '../../LoginForm';
import DraftBaggages from '../DraftBaggages';
import TeamConfig from '../TeamConfig';
import GenderLimits from '../GenderLimits';
import VisibilitySettings from '../VisibilitySettings';

import firebase from '../../../firebase';
import styles from './styles';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    draft: React.PropTypes.object.isRequired,
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
        <div className="section">
          <TeamConfig {...this.props} />
        </div>
        <div className="section">
          <DraftBaggages {...this.props} />
        </div>
        <div className="section">
          <GenderLimits {...this.props} />
        </div>
        <div className="section">
          <VisibilitySettings {...this.props} />
        </div>
        <div className="section">
        </div>
      </div>
    )
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.userIsAdmin() && this.adminSection()}
      </InlineCss>
    );
  }
});