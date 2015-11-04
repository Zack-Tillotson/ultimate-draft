import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';

import styles from './styles';

export default React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  validate(data) {
    return !!data.player && !!data.team;
  },

  getTeam() {
    return (
      <div className="teamForm">
        {this.props.data.team.name}
      </div>
    );
  },

  getPlayer() {
    return <PlayerTable players={[this.props.data.player]} columns={this.props.columns} colors={false} />
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Undo Drafting Player</h3>
        <p>Careful! Only use this if a player was drafted by mistake.</p>
        <div className="teamReview">
          {this.getTeam()}
        </div>
        <div className="playerReview">
          {this.getPlayer()}
        </div>
      </InlineCss>
    );
  }
});