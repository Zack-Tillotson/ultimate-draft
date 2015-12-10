import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';
import firebase from '../../firebase';

import Application from '../../components/Application';
import Wizard from '../../components/Wizard';

import LoginForm from '../../components/LoginForm';
import DataEntryForm from '../../components/create/DataEntryForm';
import CsvConfigurationForm from '../../components/create/CsvConfigurationForm';
import TeamConfigurationForm from '../../components/create/TeamConfigurationForm';
import DraftConfigurationForm from '../../components/create/DraftConfigurationForm';
import SaveDraftForm from '../../components/create/SaveDraftForm';

import selector from '../selector';
import actions from '../actions';
import WizardSelector from './wizardSelector';
import formNames from '../formNames';
import styles from './styles.raw.less';

const Page = React.createClass({

  componentDidMount() {
    const ref = firebase.connect();
    const auth = ref.onAuth(this.props.dispatch.triggerLogin);
  },

  render() {
    return (
      <Application footer={false}>
        <InlineCss stylesheet={styles} componentName="container">
          <Wizard {...WizardSelector(this.props.state)} navigateBack={this.props.dispatch.goBack}>
            <LoginForm name={formNames[0]} auth={this.props.state.auth} />
            <DataEntryForm name={formNames[1]} />
            <CsvConfigurationForm name={formNames[2]} />
            <TeamConfigurationForm name={formNames[3]} />
            <DraftConfigurationForm name={formNames[4]} />
            <SaveDraftForm name={formNames[5]} />
          </Wizard>
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(Page);