import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../PlayerTable';

import styles from './styles';

export default React.createClass({
  propTypes: {
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired
  },

  getInputs() {
    const viewOtherTeam = !this.refs.viewOtherTeam.checked;
    const viewYourTeam = !this.refs.viewYourTeam.checked;
    const viewUndraftable = !this.refs.viewUndraftable.checked;
    return {viewOtherTeam, viewYourTeam, viewUndraftable};
  },

  changeHandler(event) {
    this.props.updateModal(this.getInputs());
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Filter Players</h3>
        <div className="options">
          <div className="option">
            <label htmlFor="viewOtherTeam">Hide players drafted by other teams.</label>
            <input
              type="checkbox" 
              name="viewOtherTeam"
              ref="viewOtherTeam"
              onChange={this.changeHandler}
              defaultChecked={!this.props.data.inputs.viewOtherTeam.value} />
          </div>
          <div className="option">
            <label htmlFor="viewYourTeam">Hide players drafted by your team.</label>
            <input
              type="checkbox" 
              name="viewYourTeam"
              ref="viewYourTeam"
              onChange={this.changeHandler}
              defaultChecked={!this.props.data.inputs.viewYourTeam.value} />
          </div>
          <div className="option">
            <label htmlFor="viewUndraftable">Hide players your team is not currently allowed to draft.</label>
            <input
              type="checkbox" 
              name="viewUndraftable"
              ref="viewUndraftable"
              onChange={this.changeHandler}
              defaultChecked={!this.props.data.inputs.viewUndraftable.value} />
          </div>
        </div>
      </InlineCss>
    );
  }
});