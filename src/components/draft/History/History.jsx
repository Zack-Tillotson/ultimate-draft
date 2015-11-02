import React from 'react';
import InlineCss from 'react-inline-css';
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
      <div className="player" key={draft.playerId}>
        #{draft.playerId}
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
        <div className="info">
          {this.getTeam(draft)} chose Player {this.getPlayer(draft)}
        </div>
        <div className="controls">
          <div 
            className="undo"
            onClick={this.handleUndraftClick.bind(this, draft)}>X</div>
        </div>
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