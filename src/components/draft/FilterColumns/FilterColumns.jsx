import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';

import styles from './styles';

export default React.createClass({
  propTypes: {
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired
  },

  getInputs() {
    return this.props.data.map((column, index) => {
      const visible = this.refs['column' + index].checked;
      return {...column, visible}
    });
  },

  changeHandler(event) {
    this.props.updateModal(this.getInputs());
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Filter Players</h3>
        <div className="options">
          <div className="option header" key={name}>
            <div className="columnName">Column</div>
            <div className="include">Visible</div>
          </div>
          {this.props.data.map((column, index) => {
            const name = 'column' + index;
            return (
            <div className="option" key={name}>
              <label className="columnName" htmlFor={name}>
                {column.name}
                <input
                  className="visible"
                  type="checkbox" 
                  name={name}
                  ref={name}
                  onChange={this.changeHandler}
                  defaultChecked={column.visible} />
              </label>
            </div>
          )})}
        </div>
      </InlineCss>
    );
  }
});