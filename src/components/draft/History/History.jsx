import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerSummary from '../../PlayerSummary';
import modalNames from '../../../draft/modalNames';
import utils from '../../../draft/utils';

import styles from './styles';

export default React.createClass({
  propTypes: {
    drafts: React.PropTypes.array.isRequired,
    players: React.PropTypes.array.isRequired,
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
  },

  handleUndraftClick(draft) {
    this.props.viewModal(modalNames.undraftPlayer, draft);
  },

  getSummaryColumns() {
    return this.props.columns.filter(column => column.summary);
  },

  getPlayerColumn(player, column) {
    return player.data[column.name];
  },

  getDraft(draft, index) {
    return (
      <tr className="draft" key={index}>
        <td className="index">
          {index}.
        </td>
        <td className="team">
          <div className="teamColor" style={{backgroundColor: draft.team.color}}></div>
          {draft.team.name}
        </td>
        {this.getSummaryColumns().map(col => (
          <td key={col.name}>{this.getPlayerColumn(draft.player, col)}</td>
        ))}
        <td className="controls">
          <div 
            className="undo"
            onClick={this.handleUndraftClick.bind(this, draft)}>
            X
          </div>
        </td>
      </tr>
    );
  },

  getDrafts(drafts) {
    return (
      <table className="drafts">
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td colSpan={this.getSummaryColumns().length}>Player</td>
            <td className="controls"></td>
          </tr>
          <tr>
            <td>#</td>
            <td>Team</td>
            {this.getSummaryColumns().map(col => (
              <td key={col.name}>{col.name}</td>
            ))}
            <td className="controls">Undo</td>
          </tr>
        </thead>
        <tbody>
          {drafts.map((draft, index) => this.getDraft(draft, index + 1  ))}
        </tbody>
      </table>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="stats">
          Round&nbsp;
          {parseInt(this.props.drafts.length / this.props.teams.length) + 1}&nbsp;/&nbsp;
          {parseInt(this.props.players.length / this.props.teams.length) + 1}
          <br />
          {this.props.drafts.length} / {this.props.players.length} Players chosen
        </div>
        <div className="draftTable">
          {this.getDrafts(this.props.drafts)}
        </div>
      </InlineCss>
    );
  }
});