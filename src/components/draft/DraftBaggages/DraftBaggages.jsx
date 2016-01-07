import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import PlayerSummary from '../../PlayerSummary';
import utils from '../../../draft/utils';
import Formsy from 'formsy-react';
import {Select, Input} from 'formsy-react-components';
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

  getInitialState() {
    return {
      playerIdText: ''
    }
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

    return (
      <Formsy.Form className="form" onSubmit={this.addBaggageHandler} ref="form">
        <Select name="teamId" label="Team" options={teamOptions} value={teamOptions[0].value} />
        <input type="text" ref="playerIdText" onChange={this.updatePlayerId} />
        <Input type="hidden" name="playerId" value={this.getPlayerIdFromText()} />
        <input type="submit" value="Add" />
        {this.getPlayerSummary()}
      </Formsy.Form>
    )
  },

  updatePlayerId() {
    this.setState({playerIdText: this.refs.playerIdText.value});
  },

  getPlayerIdFromText() {
    const {playerIdText} = this.state;
    const player = this.props.players.find(player => 
      utils.getPlayerId(player, this.props.columns) == playerIdText
    );
    return !!player ? playerIdText : null;
  },

  addBaggageHandler(inputs) {
    this.props.addBaggageDraft({...inputs, type: 'baggage'}, this.props.connection);
    const {playerIdText} = this.state;
    const baggage = this.props.players.find(player => 
      utils.getPlayerId(player, this.props.columns) == playerIdText
    ).baggage;
    if(!!baggage) {
      const baggageId = utils.getPlayerId(baggage, this.props.columns);
      this.props.addBaggageDraft({...inputs, playerId: baggageId, type: 'baggage'}, this.props.connection);
    }
  },

  getPlayerSummary() {
    const {playerIdText} = this.state;
    const player = this.props.players.find(player => 
      utils.getPlayerId(player, this.props.columns) == playerIdText
    );
    if(!player) {
      return null;
    } else {
      const baggage = player.baggage;
      return (
        <div>
          <PlayerSummary player={player} columns={this.props.columns} />
          baggaged with 
          {!!baggage && <PlayerSummary player={baggage} columns={this.props.columns} />}
        </div>
      );
    }
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