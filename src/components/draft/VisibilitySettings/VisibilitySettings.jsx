import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import PlayerSummary from '../../PlayerSummary';
import utils from '../../../draft/utils';
import Formsy from 'formsy-react';
import {Checkbox} from 'formsy-react-components';
import ColorSelector from '../../ColorSelector';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({
  propTypes: {
    draft: React.PropTypes.object.isRequired,
    saveDraft: React.PropTypes.func.isRequired,
    connection: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      showSubmit: false
    }
  },

  saveVisibility(inputs) {
    this.props.saveVisibility(inputs.visible, this.props.connection);
  },

  updateSubmitState() {
    const {visible} = this.refs.form.getCurrentValues();
    this.setState({showSubmit: visible != this.props.draftMeta.visible});
  },
  
  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Draft Settings</h3>
        <Formsy.Form ref="form" onSubmit={this.saveVisibility} onChange={this.updateSubmitState}>
          <Checkbox name="visible" label="Visible" value={this.props.draftMeta.visible} />
          {this.state.showSubmit && (
            <div className="warning">
              <div className="warningText">
                Are you sure?! This strongly effects everyone who wants to view this draft!
              </div>
              <input type="submit" value="I'm sure" />
            </div>
          )}
        </Formsy.Form>
      </InlineCss>
    );
  }
});