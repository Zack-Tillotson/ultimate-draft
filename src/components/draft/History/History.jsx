import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerSummary from '../../PlayerSummary';
import modalNames from '../../../draft/modalNames';
import utils from '../../../draft/utils';

import styles from './styles';

export default React.createClass({
  propTypes: {
    drafts: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
  },

  handleUndraftClick(draft) {
    this.props.viewModal(modalNames.undraftPlayer, draft);
  },

  getPlayer(draft) {
    return (
      <PlayerSummary player={draft.player} columns={this.props.columns} />
    );
  },

  getTeam(draft) {
    return draft.team.name;
  },

  getDraft(draft, index) {
    return (
      <tr className="draft" key={index}>
        <td className="index">
          {index}.
        </td>
        <td className="team">
          {this.getTeam(draft)}
        </td>
        <td className="player">
          {this.getPlayer(draft)}
        </td>
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
            <td>#</td>
            <td>Team</td>
            <td>Player</td>
            <td>Undo</td>
          </tr>
        </thead>
        <tbody>
          {drafts.reverse().map((draft, index) => this.getDraft(draft, drafts.length - index))}
        </tbody>
      </table>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.getDrafts(this.props.drafts)}
      </InlineCss>
    );
  }
});