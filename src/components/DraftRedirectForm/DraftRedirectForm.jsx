import React from 'react';
import InlineCss from "react-inline-css";
import {PulseLoader} from 'halogen';

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const DraftRedirectForm = React.createClass({

  propTypes: {
    draftList: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      selectedDraftIndex: -1
    };
  },

  willReceiveProps(nextProps) {
    this.setState(this.getInitialState());
  },

  handleSubmit() {
    const draftId = this.props.draftList[this.state.selectedDraftIndex].id;
    this.props.dispatch.requestRedirect({draftId});
  },

  handleDraftSelect(selectedDraftIndex) {
    this.setState({selectedDraftIndex});
  },

  render() {
    const loadingClass = this.props.inProgress ? 'loading' : '';
    return (
      <InlineCss stylesheet={styles} componentName="container" className={loadingClass}>   
        <div className="draftItems">
          {this.props.draftList.map((draft, index) => {
            const selected = this.state.selectedDraftIndex == index ? 'selected' : '';
            return (
              <div 
                className={["draftItem", selected].join(' ')}
                key={draft.id} 
                onClick={this.handleDraftSelect.bind(this, index)}>
                {draft.id}
              </div>
            );
          })}
        </div>
        {this.props.inProgress && (
          <PulseLoader className="animatee" color="#999" />
        )}
        {!this.props.inProgress && this.state.selectedDraftIndex >= 0 && (
          <div className="submitBtn" onClick={this.handleSubmit}>Go</div>
        )}
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(DraftRedirectForm);