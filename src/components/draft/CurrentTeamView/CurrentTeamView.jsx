import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    team: React.PropTypes.object,
    viewModal: React.PropTypes.func.isRequired
  },

  clickHandler(event) {
    event.preventDefault();
    this.props.viewModal(modalNames.chooseCurrentTeam);
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="team">
          {this.props.team && (
            'Your Team: ' + this.props.team.name
          )}
          {!this.props.team && (
            'Which team do you captain?'
          )}
        </div>
        <div className="controls">
          <button onClick={this.clickHandler}>Select Team</button>
        </div>
      </InlineCss>
    );
  }
});