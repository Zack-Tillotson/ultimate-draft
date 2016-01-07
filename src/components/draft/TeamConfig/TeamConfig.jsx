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
    teams: React.PropTypes.array.isRequired,
    saveTeams: React.PropTypes.func.isRequired,
    connection: React.PropTypes.object.isRequired
  },

  saveTeams(inputs) {
    const data = this.props.teams.map(team => {
      const id = team.id;
      const color = inputs[`color${team.id}`];
      const name = inputs[`name${team.id}`];
      const order = inputs[`order${team.id}`];
      return {id, color, name, order};
    })
    .sort((a,b) => {
      return a.order - b.order;
    })
    .map(rawTeam => {
      const {order, ...team} = rawTeam;
      return team;
    });
    this.props.saveTeams(data, this.props.connection);
  },
  
  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Team Configuration</h3>
        <Formsy.Form onSubmit={this.saveTeams}>
          <ol>
            {this.props.teams.map((team, index) => {
              return (
                <li key={team.id}>
                  <Input label="Name" name={`name${team.id}`} value={team.name} />
                  <ColorSelector
                    inputName={`color${team.id}`}
                    initialColor={team.color} />
                  <Input name={`order${team.id}`} value={index + 1} label="Order" />
                </li>
              );
            })}
          </ol>
          <input type="submit" value="Save" />
        </Formsy.Form>
      </InlineCss>
    );
  }
});