import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';

import Utils from '../utils';
import Firebase from '../../firebase';

import selector from '../selector';
import actions from '../actions';
import tabNames from '../tabNames';
import modalNames from '../modalNames';
import styles from './styles';

import Application from '../../components/Application';
import TabbedContainer from '../../components/TabbedContainer';
import ModalContainer from '../../components/ModalContainer';
import StatusView from '../../components/draft/StatusView';

// Tabs
import Players from '../../components/draft/Players'
import Teams from '../../components/draft/Teams';
import History from '../../components/draft/History';

// Modals
import ChooseViewTeam from '../../components/draft/ChooseViewTeam';
import FilterColumns from '../../components/draft/FilterColumns';
import FilterPlayers from '../../components/draft/FilterPlayers';
import DraftPlayer from '../../components/draft/DraftPlayer';
import UndraftPlayer from '../../components/draft/UndraftPlayer';

const Page = React.createClass({
  
  componentDidMount() {
    this.connectToFirebase()
    document.addEventListener('keydown', this.keyPressHandler);
  },

  componenWillUnmount() {
    this.disconnectFirebase();
    document.removeEventListener('keydown', this.keyPressHandler);
  },

  connectToFirebase() {
    const firebaseId = Utils.getFirebaseId();
    if(firebaseId) {
      this.firebaseRef = Firebase.sync(firebaseId, this.props.dispatch.firebase);
    } else {
      this.props.dispatch.blowup('Draft not found, please check to make sure the URL is correct');
    }
  },

  disconnectFirebase() {
    if(this.firebaseRef) {
      this.firebaseRef.off();
    }
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
          <div className="spinner">Loading draft, please wait!</div>
        </div>
      );
    } else {
      return null;
    }
  },

  keyPressHandler(event) {
    switch(event.keyCode) {
      case 68: // d
        const teamId = this.props.status.draftOrder[0].id;
        this.props.dispatch.viewModal(modalNames.draftPlayer, {playerId: 1, teamId});
        break;
      case 13: // Enter
        this.refs.modals.confirmHandler(event);
        break;
      case 27: // Esc
        if(this.props.ui.modal) {
          this.props.dispatch.cancelModal();
        }
        break;
      case 49: // 1
        if(!this.props.ui.modal) {
          this.props.dispatch.tabClick(tabNames.players);
        }
        break;
      case 50: // 2
        if(!this.props.ui.modal) {
          this.props.dispatch.tabClick(tabNames.teams);
        }
        break;
      case 51: // 3
        if(!this.props.ui.modal) {
          this.props.dispatch.tabClick(tabNames.history);
        }
        break;
    }
  },

  render() {
    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">

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
              viewModal={this.props.dispatch.viewModal} />

          </TabbedContainer>

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

          <StatusView 
            team={this.props.user.team}
            status={this.props.status}
            columns={this.props.columns}
            viewModal={this.props.dispatch.viewModal} />

          {this.getStatusOverlay()}

        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions)(Page);