import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import PlayerSummary from '../../PlayerSummary';
import utils from '../../../draft/utils';
import Formsy from 'formsy-react';
import {Select, Input} from 'formsy-react-components';
import ColorSelector from '../../ColorSelector';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({
  propTypes: {
    draft: React.PropTypes.object.isRequired,
    saveDraft: React.PropTypes.func.isRequired,
    connection: React.PropTypes.object.isRequired
  },

  saveDraft(inputs) {
    this.props.saveDraft(inputs, this.props.connection);
  },

  getGenderStats(gender) {
    const genderCount = this.getGenderCount(gender);
    const teamCount = this.props.teams.length;
    const avgPerTeam = parseInt(genderCount / teamCount * 100) / 100;
    return (
      <div>
        {genderCount} {gender},&nbsp; 
        {teamCount} teams =>
        {avgPerTeam} average per team
      </div>
    );
  },

  getGenderCount(gender) {
    return this.props.players
      .filter(player => utils.getGender(player, this.props.columns) == gender)
      .length;
  },
  
  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Gender Limits</h3>
        <div>
          {this.getGenderStats('M')}
          {this.getGenderStats('F')}
        </div>
        <Formsy.Form onSubmit={this.saveDraft}>
          <Input label="Maximum men per team" name="maxMen" value={this.props.draft.maxMen} />
          <Input label="Maximum women per team" name="maxWomen" value={this.props.draft.maxWomen} />
          <input type="submit" value="Save" />
        </Formsy.Form>
      </InlineCss>
    );
  }
});