import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired
  },

  modalClickHandler(name) {
    this.props.viewModal(name);
  },

  getColumnFilterModalLink() {
    const name = modalNames.filterColumns;
    return (
      <span className="modalLink" onClick={this.modalClickHandler.bind(this, name)}>
        {name}
      </span>
    );
  },

  getRowFilterModalLink() {
    const name = modalNames.filterRows;
    return (
      <span className="modalLink" onClick={this.modalClickHandler.bind(this, name)}>
        {name}
      </span>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="configs">
          {this.getColumnFilterModalLink()}
          {this.getRowFilterModalLink()}
        </div>
        {this.props.players.length} Players
      </InlineCss>
    );
  }
});