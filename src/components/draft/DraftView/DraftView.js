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
import DraftTutorial from '../DraftTutorial';

// Tabs
import Settings from '../Settings'
import Players from '../Players'
import Teams from '../Teams';
import History from '../History';

// Modals
import ChooseViewTeam from '../ChooseViewTeam';
import FilterColumns from '../FilterColumns';
import FilterPlayers from '../FilterPlayers';
import DraftPlayer from '../DraftPlayer';
import UndraftPlayer from '../UndraftPlayer';

const DraftView = React.createClass({

  propTypes: {

  },
  
  getStatusOverlay() {
    if(this.props.firebase.broken || this.props.ui.error) {
      return (
        <div className="error">
          Unable to connect to the draft. Please check the URL and reload the page.
        </div>
      );
    } else if(!this.props.firebase.connected && !this.props.ui.error) {
      return (
        <div className="error">
          <div className="spinner">
            Connecting to database
          </div>
          <PulseLoader className="animatee" color="#999" />
        </div>
      );
    } else {
      return null;
    }
  },

  getTeamStatus() {
    return (
      <StatusView 
        user={this.props.user}
        status={this.props.status}
        columns={this.props.columns}
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
          rowFilters={this.props.user.rowFilters} />
        <Teams 
          tabName={tabNames.teams}
          columns={this.props.columns}
          teams={this.props.teams}
          viewModal={this.props.dispatch.viewModal} />
        <History 
          tabName={tabNames.history}
          columns={this.props.columns}
          drafts={this.props.drafts}
          teams={this.props.teams}
          players={this.props.players}
          viewModal={this.props.dispatch.viewModal} />
        <Settings
          tabName={tabNames.settings}
          columns={this.props.columns}
          players={this.props.players}
          drafts={this.props.drafts}
          baggageDrafts={this.props.baggageDrafts}
          teams={this.props.teams}
          isAdmin={this.props.firebase.isAdmin} 
          auth={this.props.auth}
          addBaggageDraft={this.props.dispatch.addBaggageDraft}
          viewModal={this.props.dispatch.viewModal} />

      </TabbedContainer>
    );
  },

  getModal() {
    return (
      <ModalContainer 
          ref="modals"
          currentModalName={this.props.ui.modal}
          modalData={this.props.ui.modalData}
          confirmHandler={this.props.dispatch.confirmModal}
          cancelHandler={this.props.dispatch.cancelModal}>

        <ChooseViewTeam
          modalName={modalNames.chooseViewTeam}
          updateModal={this.props.dispatch.updateModal}
          teams={this.props.teams}
          data={this.props.ui.modalData}
          viewTeam={this.props.user.viewTeam} />
        <FilterColumns 
          modalName={modalNames.filterColumns}
          updateModal={this.props.dispatch.updateModal}
          data={this.props.columns} />
        <FilterPlayers 
          modalName={modalNames.filterRows}
          updateModal={this.props.dispatch.updateModal}
          data={this.props.ui.modalData} />
        <DraftPlayer
          modalName={modalNames.draftPlayer}
          updateModal={this.props.dispatch.updateModal}
          data={this.props.ui.modalData} 
          teams={this.props.teams}
          players={this.props.players}
          drafts={this.props.drafts}
          columns={this.props.columns} />
        <UndraftPlayer
          modalName={modalNames.undraftPlayer}
          data={this.props.ui.modalData}
          columns={this.props.columns} />

      </ModalContainer>
    );
  },

  getNotifications() {
    return (
      <DraftNotifications
        drafts={this.props.drafts}
        teams={this.props.teams}
        user={this.props.user}
        status={this.props.status} />
    );
  },

  getTutorial() {
    return (
      <DraftTutorial 
        step={this.props.user.tutorialStep}
        nextTutorialStep={this.props.dispatch.nextTutorialStep}
        quitTutorial={this.props.dispatch.quitTutorial} />
    );
  },

  render() {
    return (
      <div>
        {this.getDraftOrder()}
        {this.getTeamStatus()}
        {this.getTabs()}
        {this.getModal()}
        {this.getStatusOverlay()}
        {this.getNotifications()}
        {this.getTutorial()}
      </div>
    );
  }
});

export default DraftView;