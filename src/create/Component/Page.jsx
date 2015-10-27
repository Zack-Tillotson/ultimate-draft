import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';

import Application from '../../components/Application';
import Wizard from '../../components/Wizard';

import DataEntryForm from '../../components/DataEntryForm';
import CsvConfigurationForm from '../../components/CsvConfigurationForm';
import TeamConfigurationForm from '../../components/TeamConfigurationForm';
import SaveDraftForm from '../../components/SaveDraftForm';

import selector from '../selector';
import actions from '../actions';
import WizardSelector from './wizardSelector';
import formNames from '../formNames';
import styles from './styles.raw.less';

const CreatePage = React.createClass({
  render() {
    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">
          <Wizard {...WizardSelector(this.props.state)} navigateBack={this.props.dispatch.goBack}>
            <DataEntryForm name={formNames[0]} />
            <CsvConfigurationForm name={formNames[1]} />
            <TeamConfigurationForm name={formNames[2]} />
            <SaveDraftForm name={formNames[3]} />
          </Wizard>
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions.dispatcher)(CreatePage);