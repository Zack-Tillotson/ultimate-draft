import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';
import PlayerTable from '../../PlayerTable';

import styles from './styles';

export default React.createClass({

  propTypes: {
    currentTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    rowFilters: React.PropTypes.object.isRequired,
    players: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
    drafts: React.PropTypes.array.isRequired
  },

  modalClickHandler(name, data = {}) {
    this.props.viewModal(name, data);
  },

  draftPlayerHandler(playerId) {
    const teamId = this.props.currentTeam;
    this.modalClickHandler(
      modalNames.draftPlayer, 
      {playerId, teamId}
    ); 
  },

  getColumnFilterModalLink() {
    const name = modalNames.filterColumns;
    const data = this.props.columns;
    return (
      <span className="modalLink" onClick={this.modalClickHandler.bind(this, name, data)}>
        {name}
      </span>
    );
  },

  getRowFilterModalLink() {
    const name = modalNames.filterRows;
    const data = this.props.rowFilters;
    return (
      <span className="modalLink" onClick={this.modalClickHandler.bind(this, name, data)}>
        {name}
      </span>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="configs">
          {this.getColumnFilterModalLink()}
          {this.getRowFilterModalLink()}
        </div>
        <PlayerTable 
          players={this.props.players} 
          filterColumns={true}
          columns={this.props.columns}
          filterRows={true}
          rowFilters={this.props.rowFilters}
          playerClickHandler={this.draftPlayerHandler} />
      </InlineCss>
    );
  }
});