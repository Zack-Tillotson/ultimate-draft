import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';

import Utils from '../utils';
import Firebase from '../../firebase';

import selector from '../selector';
import actions from '../actions';
import tabNames from '../tabNames';
import modalNames from '../modalNames';
import styles from './styles.raw.less';

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

const DraftPage = React.createClass({
  
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

  getLoadingSpinner() {
    return !this.props.firebase.connected && (
      <div className="error">
        <div className="spinner">Loading draft, please wait!</div>
      </div>
    );
  },

  getError() {
    return this.props.firebase.broken && (
      <div className="error">Unable to connect to the draft - please check the URL and try again.</div>
    );
  },

  render() {
    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">

          <CurrentTeamView />

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
              drafts={this.props.drafts} />

          </TabbedContainer>

          <ModalContainer 
              currentModalName={this.props.ui.modal}
              modalData={this.props.ui.modalData}
              confirmHandler={this.props.dispatch.confirmModal}
              cancelHandler={this.props.dispatch.cancelModal}>

            <ChooseCurrentTeam modalName={modalNames.chooseCurrentTeam} />
            <FilterColumns modalName={modalNames.filterColumns} />
            <FilterPlayers modalName={modalNames.filterRows} />
            <DraftPlayer 
              updateModal={this.props.dispatch.updateModal}
              modalName={modalNames.draftPlayer}
              data={this.props.ui.modalData} 
              teams={this.props.teams} />
            <UndraftPlayer modalName={modalNames.undraftPlayer} />

          </ModalContainer>

          {this.getError()}
          {this.getLoadingSpinner()}

        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(DraftPage);