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
import WizardSelector from './wizardSelector';
import formNames from '../formNames';
import styles from './styles.raw.less';

const CreatePage = React.createClass({
  render() { 
    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">
          <Wizard {...WizardSelector(this.props.state)} >
            <DataEntryForm step={1} name={formNames[0]} />
            <CsvConfigurationForm step={2} name={formNames[1]} />
            <TeamConfigurationForm step={3} name={formNames[2]} />
            <SaveDraftForm step={4} name={formNames[3]} />
          </Wizard>
        </InlineCss>
      </Application>
    );
  }
});

export default connect(selector)(CreatePage);