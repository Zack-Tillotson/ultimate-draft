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
      this.firebaseRef = Firebase.connect(firebaseId, this.props.dispatch.firebase);
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
    return this.props.ui.error && (
      <div className="error">{this.props.ui.error}</div>
    );
  },

  render() {
    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">
          {this.getError()}
          {this.getLoadingSpinner()}
          <CurrentTeamView />
          <TabbedContainer 
              currentTabName={this.props.ui.tab}
              tabClickHandler={this.props.dispatch.tabClick} >
            <Players 
              tabName={tabNames.players}
              players={this.props.players}
              viewModal={this.props.dispatch.viewModal} />
            <Teams tabName={tabNames.teams} />
            <History tabName={tabNames.history} />
          </TabbedContainer>
          <ModalContainer 
              currentModalName={this.props.ui.modal}
              confirmHandler={this.props.dispatch.confirmModal}
              cancelHandler={this.props.dispatch.cancelModal}>
            <ChooseCurrentTeam modalName={modalNames.chooseCurrentTeam} />
            <FilterColumns modalName={modalNames.filterColumns} />
            <FilterPlayers modalName={modalNames.filterRows} />
            <DraftPlayer modalName={modalNames.draftPlayer} />
            <UndraftPlayer modalName={modalNames.undraftPlayer} />
          </ModalContainer>
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(DraftPage);