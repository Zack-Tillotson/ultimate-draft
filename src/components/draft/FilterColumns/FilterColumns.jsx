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
        <h3>Select Visible Columns</h3>
        <table className="options">
          <thead>
            <tr className="option header" key={name}>
              <td className="columnName">Column</td>
              <td className="include">Visible</td>
            </tr>
          </thead>
          <tbody>
          {this.props.data.map((column, index) => {
            const name = 'column' + index;
            return (
            <tr className="option" key={name}>
              <td>
                <label className="columnName" htmlFor={name}>
                  {column.name}
                </label>
              </td>
              <td>
                <input
                    className="visible"
                    type="checkbox" 
                    name={name}
                    ref={name}
                    id={name}
                    onChange={this.changeHandler}
                    defaultChecked={column.visible} />
              </td>
            </tr>
          )})}
          </tbody>
        </table>
      </InlineCss>
    );
  }
});