import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';
import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const SaveDraftForm = React.createClass({

  saveHandler(event) {
    event.preventDefault();
    this.props.dispatch.saveDraft(this.props.data);
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Save</h3>

        <h5>Columns</h5>
        {this.props.columns.length} columns.

        <h5>Teams</h5>
        {this.props.teams.length} teams.

        <h5>Players</h5>
        {this.props.players.length} players.

        <div>
          <button type='submit' onClick={this.saveHandler}>Save Draft</button>
        </div>

        {!!this.props.shareLink && (
          <div>
            <h4>Important!</h4>
            This is the link for this draft. Share with the captains and save it - this is
            the only way to access this draft.
            <div>
              <a href={this.props.shareLink}>{this.props.shareLink}</a>
            </div>
          </div>
        )}

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(SaveDraftForm);