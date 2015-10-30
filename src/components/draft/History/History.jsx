import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({
  propTypes: {
    drafts: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  getPlayerId(player) {
    const idColumn = this.props.columns.find(column => column.type === 'ID');
    return player[idColumn.name];  
  },


  getPlayer(draft) {
    return (
      <div className="player" key={Math.random()}>
        #{this.getPlayerId(draft.player)}
      </div>
    );
  },

  getTeam(draft) {
    return (
      <div className="team" key={draft.team.id}>
        {draft.team.name}
      </div>
    );
  },

  getDraft(draft, index) {
    return (
      <div className="draft" key={index}>
        {this.getTeam(draft)} chose Player {this.getPlayer(draft)}
      </div>
    );
  },

  getDrafts(drafts) {
    return (
      <div className="drafts">
        {drafts.map((draft, index) => this.getDraft(draft, index))}
      </div>
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