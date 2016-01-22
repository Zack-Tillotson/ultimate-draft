import React from 'react';
import InlineCss from 'react-inline-css';
import {PulseLoader} from 'halogen';

import tabNames from '../../../draft/tabNames';
import modalNames from '../../../draft/modalNames';

import Application from '../../Application';
import TabbedContainer from '../../TabbedContainer';
import ModalContainer from '../../ModalContainer';
import StatusView from '../StatusView';
import DraftOrder from '../DraftOrder';
import DraftNotifications from '../DraftNotifications';

// Tabs
import Settings from '../Settings'
import Players from '../Players'
import Teams from '../Teams';
import History from '../History';

// Modals
import ChooseViewTeam from '../ChooseViewTeam';
import FilterColumns from '../FilterColumns';
import DraftPlayer from '../DraftPlayer';
import UndraftPlayer from '../UndraftPlayer';

const DraftView = React.createClass({

  propTypes: {

  },
  
  getTeamStatus() {
    return (
      <StatusView 
        user={this.props.user}
        status={this.props.status}
        columns={this.props.columns}
        isAdmin={this.props.connection.isAdmin}
        viewModal={this.props.dispatch.viewModal} />
    );
  },

  getDraftOrder() {
    return (
      <DraftOrder status={this.props.status} />
    );
  },

  getTabs() {
    return (
      <TabbedContainer 
          currentTabName={this.props.ui.tab}
          tabClickHandler={this.props.dispatch.tabClick} >

        <Players 
          tabName={tabNames.players}
          columns={this.props.columns}
          players={this.props.players}
          drafts={this.props.drafts}
          status={this.props.status}
          viewModal={this.props.dispatch.viewModal} 
          viewTeam={this.props.user.viewTeam}
          toggleFilter={this.props.dispatch.toggleFilter}
          rowFilters={this.props.user.rowFilters}
          userData={this.props.local}
          updateSortPreference={this.props.dispatch.updateSortPreference} />
        <Teams 
          tabName={tabNames.teams}
          columns={this.props.columns}
          teams={this.props.teams}
          userData={this.props.local}
          viewModal={this.props.dispatch.viewModal} />
        <History 
          tabName={tabNames.history}
          columns={this.props.columns}
          drafts={this.props.drafts}
          teams={this.props.teams}
          players={this.props.players}
          isAdmin={this.props.connection.isAdmin} 
          viewModal={this.props.dispatch.viewModal} />
        {this.props.connection.isAdmin && (
          <Settings
            tabName={tabNames.settings}
            columns={this.props.columns}
            players={this.props.players}
            drafts={this.props.drafts}
            draft={this.props.draft}
            draftMeta={this.props.draftMeta}
            userData={this.props.userData}
            baggageDrafts={this.props.baggageDrafts}
            teams={this.props.teams}
            isAdmin={this.props.connection.isAdmin} 
            auth={this.props.auth}
            connection={this.props.connection}
            addBaggageDraft={this.props.dispatch.addBaggageDraft}
            viewModal={this.props.dispatch.viewModal} 
            saveTeams={this.props.dispatch.saveTeams}
            saveDraft={this.props.dispatch.saveDraft}
            saveVisibility={this.props.dispatch.saveVisibility} />
          )}

      </TabbedContainer>
    );
  },

  getModal() {
    return (
      <ModalContainer 
          ref="modals"
          currentModalName={this.props.ui.modal}
          modalData={this.props.ui.modalData}
          showConfirm={this.props.ui.modal != modalNames.draftPlayer || this.props.connection.isAdmin}
          confirmHandler={this.props.dispatch.confirmModal}
          cancelHandler={this.props.dispatch.cancelModal}
          connection={this.props.connection}
          userData={this.props.userData}>

        <ChooseViewTeam
          modalName={modalNames.chooseViewTeam}
          updateModal={this.props.dispatch.updateModal}
          teams={this.props.teams}
          data={this.props.ui.modalData}
          previousTeamChoice={this.props.userData.selectedTeam}
          viewTeam={this.props.user.viewTeam} />
        <FilterColumns 
          modalName={modalNames.filterColumns}
          updateModal={this.props.dispatch.updateModal}
          data={this.props.columns} />
        <DraftPlayer
          modalName={modalNames.draftPlayer}
          updateModal={this.props.dispatch.updateModal}
          data={this.props.ui.modalData} 
          teams={this.props.teams}
          players={this.props.players}
          drafts={this.props.drafts}
          columns={this.props.columns}
          connection={this.props.connection} />
        <UndraftPlayer
          modalName={modalNames.undraftPlayer}
          data={this.props.ui.modalData}
          columns={this.props.columns}
          connection={this.props.connection} />

      </ModalContainer>
    );
  },

  getNotifications() {
    return (
      <DraftNotifications
        drafts={this.props.drafts}
        teams={this.props.teams}
        user={this.props.user}
        status={this.props.status}
        columns={this.props.columns}
        players={this.props.players} />
    );
  },

  render() {
    return (
      <div>
        {this.getDraftOrder()}
        {this.getTeamStatus()}
        {this.getTabs()}
        {this.getModal()}
        {this.getNotifications()}
      </div>
    );
  }
});

export default DraftView;