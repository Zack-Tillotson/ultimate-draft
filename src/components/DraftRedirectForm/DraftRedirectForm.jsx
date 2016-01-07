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

  handleSubmit(draftId) {
    this.props.dispatch.requestRedirect({draftId});
  },

  render() {
    const loadingClass = this.props.inProgress ? 'loading' : '';
    return (
      <InlineCss stylesheet={styles} componentName="container" className={loadingClass}>   
        <h3>Choose a draft from the list below</h3>
        <div className="draftItems">
          {this.props.draftList.filter(draft => draft.visible).map((draft, index) => {
            return (
              <div 
                className={"draftItem"}
                key={draft.id} 
                onClick={this.handleSubmit.bind(this, draft.id)}>
                {draft.id}
              </div>
            );
          })}
          {!this.props.draftList.length && (
            <PulseLoader className="animatee" color="#999" />
          )}
        </div>
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(DraftRedirectForm);