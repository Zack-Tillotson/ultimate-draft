import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';
import styles from './styles';
import {Input} from 'formsy-react-components';
import selector from './selector.js';
import {dispatcher} from './actions.js';

import PlayerTable from '../../PlayerTable';
import TeamList from '../../TeamList';

const SaveDraftForm = React.createClass({

  propTypes: {
    columns: React.PropTypes.array, 
    players: React.PropTypes.array, 
    teams: React.PropTypes.array, 
    data: React.PropTypes.object, 
    shareLink: React.PropTypes.string,
    navigateBackButton: React.PropTypes.object
  },

  saveHandler(data) {
    event.preventDefault();
    const {columns, players, teams, draft} = this.props;
    this.props.dispatch.saveDraft({columns, players, teams, draft});
  },

  getShareLink() {
    return '/';
  },

  getPlayersArray() {
    return this.props.players.map(player => {
      return {data: player}
    });
  },

  render() {
    const draftId = this.props.draft.draftId || '';
    return (
      <InlineCss stylesheet={styles} componentName="container">

        <Formsy.Form 
          onSubmit={this.saveHandler}>

          <h5>Draft Details</h5>
          <Input
              name="draftId"
              label="Draft ID"
              value={draftId}
              disabled={true} />

            <Input
              name="draftPw"
              label="Draft Password"
              value={this.props.draft.draftPw}
              disabled={true} />

          <h5>{this.props.players.length} Players</h5>
          <PlayerTable players={this.getPlayersArray()} columns={this.props.columns} />

          <h5>{this.props.teams.length} Teams</h5>
          <Input
              name="maxMen"
              label="Maximum Men Per Team"
              value={this.props.draft.maxMen}
              disabled={true} />

            <Input
              name="maxWomen"
              label="Maximum Women Per Team"
              value={this.props.draft.maxWomen}
              disabled={true} />
          <TeamList teams={this.props.teams} />

          {!this.props.draft.saved && (
            <div>
              <button type='submit'>Save Draft</button>
              {this.props.navigateBackButton}
            </div>
          )}

          {this.props.draft.saved && (
            <div className="savedNotification">
              Saved! This draft is ready to start. Go <a href={this.getShareLink()}>Here</a> to start drafting. 
              Remember your draft ID and password!
            </div>
          )}

        </Formsy.Form>

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(SaveDraftForm);