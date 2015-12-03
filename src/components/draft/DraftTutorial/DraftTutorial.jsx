import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({

  propTypes: {
    step: React.PropTypes.number.isRequired,
    nextTutorialStep: React.PropTypes.func.isRequired,
    quitTutorial: React.PropTypes.func.isRequired
  },

  tutorialLinkClickHandler(event) {
    if(this.props.step == 0) {
      this.props.nextTutorialStep();
    } else {
      this.quitClickHandler(event);
    }
  },

  quitClickHandler(event) {
    event.preventDefault();
    this.props.quitTutorial();
  },

  nextStepClickHandler(event) {
    event.preventDefault();
    this.props.nextTutorialStep();
  },

  getCurrentStep() {
    switch(this.props.step) {
      case 0:
        return '';
      case 1:
        return (
          <div className="step" onClick={this.nextStepClickHandler}>
            <div className="top step1">
            </div>
            <div className="bottom step1">
              <h3>Stress free drafting.</h3>
              <div className="promoImage"></div>
              <table className="highlights threeWide">
                <tr>
                  <td>
                    Easily see who is available to draft.
                  </td>
                  <td>
                    Quickly enter your choice.
                  </td>
                  <td>
                    Automatically synchronizes data between all captains.
                  </td>
                </tr>
              </table>
              <div className="navLink">
                Click to continue
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step" onClick={this.nextStepClickHandler}>
            <div className="top step2">
            </div>
            <div className="bottom step2">
              <h3>The team draft order</h3>
              <div className="promoImage"></div>
              <table className="highlights twoWide">
                <tr>
                  <td>
                    This area shows the order the teams draft in.
                  </td>
                  <td>
                    Snake draft format (i.e., 1&#8594;10, 10&#8594;1, 1&#8594;10, etc.)
                  </td>
                </tr>
              </table>
              <div className="navLink">
                Click to continue
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step" onClick={this.nextStepClickHandler}>
            <div className="top step3">
            </div>
            <div className="bottom step3">
              <h3>Select your team.</h3>
              <div className="promoImage"></div>
              <table className="highlights threeWide">
                <tr>
                  <td>
                    Click &apos;Select Team&apos; to see your draft options.
                  </td>
                  <td>
                    View team statistics.
                  </td>
                  <td>
                    Get reminded when it&apos;s your turn to draft.
                  </td>
                </tr>
              </table>
              <div className="navLink">
                Click to continue
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step" onClick={this.nextStepClickHandler}>
            <div className="top step4">
              <h3>Click on a player to draft them.</h3>
              <table className="highlights threeWide">
                <tr>
                  <td>
                    Click a player to open the draft form.
                  </td>
                  <td>
                    Use the form to review the player and their baggage.
                  </td>
                  <td>
                     Submit the draft form to draft the player.
                  </td>
                </tr>
              </table>
              <div className="navLink">
                Click to continue
              </div>
            </div>
            <div className="bottom step4">
            </div>
          </div>
        );
    }
  },

  render() {
    const inTutorialClass = !!this.props.step ? 'active' : 'inactive';
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className={["tutorialLink", inTutorialClass].join(' ')} onClick={this.tutorialLinkClickHandler}>
          {!!this.props.step && 'Close'} Help
        </div>
        {!!this.props.step && (
          <div className="tutorial">
            {this.getCurrentStep()}
          </div>
        )}
      </InlineCss>
    );
  }
});