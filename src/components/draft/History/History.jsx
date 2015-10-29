import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({
  propTypes: {
    drafts: React.PropTypes.array.isRequired
  },

  getPlayer(draft) {
    return (
      <div className="player" key={Math.random()}>
        {JSON.stringify(draft.player)}
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
        {this.getTeam(draft)} chose {this.getPlayer(draft)}
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