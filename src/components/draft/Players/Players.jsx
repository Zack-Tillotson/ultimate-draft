import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';
import PlayerTable from '../../PlayerTable';

import styles from './styles';

export default React.createClass({

  propTypes: {
    viewTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
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

  getRowFilterModalLink() {
    const name = modalNames.filterRows;
    const {rowFilters} = this.props;
    return (
      <span className="rowFilters modalLink" onClick={this.modalClickHandler.bind(this, name, rowFilters)}>
        <div className="title">
          Filters
        </div>
        <div className="filterIcons">
          <div className={
            ['rowFilter', 'otherTeam', rowFilters.viewOtherTeam ? 'unfiltered' : 'filtered'].join(' ')
          }>
            Other Team
            <div className="logo">{rowFilters.viewOtherTeam ? '\u2a09' : '\u2713'}</div>
          </div>
          <div className={
            ['rowFilter', 'yourTeam', rowFilters.viewYourTeam ? 'unfiltered' : 'filtered'].join(' ')
          }>
            Your Team
            <div className="logo">{rowFilters.viewYourTeam ? '\u2a09' : '\u2713'}</div>
          </div>
          <div className={
            ['rowFilter', 'undraftable', rowFilters.viewUndraftable ? 'unfiltered' : 'filtered'].join(' ')
          }>
            Illegal Drafts
            <div className="logo">{rowFilters.viewUndraftable ? '\u2a09' : '\u2713'}</div>
          </div>
        </div>
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
          bottomLegend={true}
          topLegend={true}
          playerClickHandler={this.draftPlayerHandler} />
      </InlineCss>
    );
  }
});