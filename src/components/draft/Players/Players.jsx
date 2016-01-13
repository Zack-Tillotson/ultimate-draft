import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';
import PlayerTable from '../../PlayerTable';
import FilterPlayers from '../FilterPlayers'

import styles from './styles';

export default React.createClass({

  propTypes: {
    rowFilters: React.PropTypes.object.isRequired,
    players: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
    drafts: React.PropTypes.array.isRequired,
    status: React.PropTypes.object.isRequired
  },

  modalClickHandler(name, data = {}) {
    this.props.viewModal(name, data);
  },

  draftPlayerHandler(playerId) {
    const teamId = this.props.status.nextDraft.teamId;
    this.modalClickHandler(
      modalNames.draftPlayer, 
      {playerId, teamId}
    ); 
  },

  getColumnFilterModalLink() {
    const name = modalNames.filterColumns;
    const data = this.props.columns;
    return (
      <span className="columnFilters modalLink" onClick={this.modalClickHandler.bind(this, name, data)}>
        {name}
      </span>
    );
  },

  getRowFilters() {
    return (
      <FilterPlayers rowFilters={this.props.rowFilters} toggleFilter={this.props.toggleFilter} />
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="configs">
          {this.getRowFilters()}
          {this.getColumnFilterModalLink()}
        </div>
        <PlayerTable 
          players={this.props.players}
          filterColumns={true}
          columns={this.props.columns}
          filterRows={true}
          rowFilters={this.props.rowFilters}
          playerClickHandler={this.draftPlayerHandler}
          colors={true} />
      </InlineCss>
    );
  }
});