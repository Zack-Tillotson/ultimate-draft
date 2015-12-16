import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import PlayerSummary from '../../PlayerSummary';
import utils from '../../../draft/utils';
import Formsy from 'formsy-react';
import {Select} from 'formsy-react-components';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    drafts: React.PropTypes.array.isRequired,
    players: React.PropTypes.array.isRequired,
    baggageDrafts: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
    addBaggageDraft: React.PropTypes.func.isRequired
  },

  isDrafted(baggageDraft) {
    return !!this.props.drafts.find(draft => 
      (draft.playerId == baggageDraft.playerId) ||
      (draft.baggage && utils.getPlayerId(draft.baggage, columns) == baggageDraft.playerId)
    );
  },

  handleUndraftClick(draft) {
    this.props.viewModal(modalNames.undraftPlayer, draft);
  },

  getCurrentBaggageList() {
    return (
      <table>
        <thead>
          <tr>
            <td>Team</td>
            {this.props.columns.filter(column => column.summary).map(column => (
              <td key={column.name}>{column.name}</td>              
            ))}
            <td>Status</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {this.props.baggageDrafts.map(draft => (
            <tr key={draft.playerId + draft.teamId}>
              <td>{draft.team.name}</td>
              {this.props.columns.filter(column => column.summary).map(column => (
                <td key={column.name}>{draft.player.data[column.name]}</td>              
              ))}
              <td>
                {this.isDrafted(draft) ? 'Drafted' : 'Undrafted'}
              </td>
              <td>
                <div 
                  className="undo"
                  onClick={this.handleUndraftClick.bind(this, draft)}>
                  X
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  getAddBaggageForm() {

    const teamOptions = this.props.teams.map(team => { 
      return {
        label: team.name, 
        value: team.id
      }
    });
    const playerOptions = this.props.players.map(player => {
      return {
        label: this.getPlayerSummary(player), 
        value: utils.getPlayerId(player, this.props.columns)
      }
    });

    return (
      <Formsy.Form className="form" onSubmit={this.addBaggageHandler}>
        <Select name="teamId" label="Team" options={teamOptions} value={teamOptions[0].value}/>
        <Select name="playerId" label="Player" options={playerOptions} value={playerOptions[0].value} />
        <input type="submit" value="Add" />
      </Formsy.Form>
    )
  },

  addBaggageHandler(inputs) {
    this.props.addBaggageDraft({...inputs, type: 'baggage'}, this.props.connection);
  },

  getPlayerSummary(player) {
    return this.props.columns
      .filter(column => column.summary)
      .map(column => player.data[column.name])
      .join(' ');
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Baggage Captains To Teams</h3>
        {this.getCurrentBaggageList()}
        {this.getAddBaggageForm()}
      </InlineCss>
    );
  }
});