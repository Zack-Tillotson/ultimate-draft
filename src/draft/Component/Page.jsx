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
import CurrentTeamView from '../../components/draft/CurrentTeamView';

// Tabs
import Players from '../../components/draft/Players'
import Teams from '../../components/draft/Teams';
import History from '../../components/draft/History';

// Modals
import ChooseCurrentTeam from '../../components/draft/ChooseCurrentTeam';
import FilterColumns from '../../components/draft/FilterColumns';
import FilterPlayers from '../../components/draft/FilterPlayers';
import DraftPlayer from '../../components/draft/DraftPlayer';
import UndraftPlayer from '../../components/draft/UndraftPlayer';

const Page = React.createClass({
  
  componentDidMount() {
    this.connectToFirebase()
  },

  componenWillUnmount() {
    this.disconnectFirebase();
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

  render() {
    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">

          <CurrentTeamView 
            team={this.props.user.team}
            viewModal={this.props.dispatch.viewModal} />

          <TabbedContainer 
              currentTabName={this.props.ui.tab}
              tabClickHandler={this.props.dispatch.tabClick} >

            <Players 
              tabName={tabNames.players}
              columns={this.props.columns}
              players={this.props.players}
              drafts={this.props.drafts}
              viewModal={this.props.dispatch.viewModal} 
              currentTeam={this.props.user.currentTeam} />
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
              currentModalName={this.props.ui.modal}
              modalData={this.props.ui.modalData}
              confirmHandler={this.props.dispatch.confirmModal}
              cancelHandler={this.props.dispatch.cancelModal}>

            <ChooseCurrentTeam
              modalName={modalNames.chooseCurrentTeam}
              updateModal={this.props.dispatch.updateModal}
              teams={this.props.teams}
              currentTeam={this.props.user.currentTeam} />
            <FilterColumns modalName={modalNames.filterColumns} />
            <FilterPlayers modalName={modalNames.filterRows} />
            <DraftPlayer
              modalName={modalNames.draftPlayer}
              updateModal={this.props.dispatch.updateModal}
              data={this.props.ui.modalData} 
              teams={this.props.teams}
              columns={this.props.columns} />
            <UndraftPlayer
              modalName={modalNames.undraftPlayer}
              data={this.props.ui.modalData}
              columns={this.props.columns} />

          </ModalContainer>

          {this.getStatusOverlay()}

        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(Page);