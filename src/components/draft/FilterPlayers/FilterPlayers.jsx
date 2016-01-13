import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({
  propTypes: {
    rowFilters: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      explanationToggle: false
    }
  },

  filterClickHandler(filterName) {
    const filterData = {};
    filterData[filterName] = !this.props.rowFilters[filterName];
    this.props.toggleFilter(filterData);
  },

  toggleExplantions() {
    this.setState({explanationToggle: !this.state.explanationToggle});
  },

  render() {
    const {rowFilters} = this.props;
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="title">
          Draftable Player Filters
          <span className="explanationToggle" onClick={this.toggleExplantions}>?</span>
        </div>
        {this.state.explanationToggle && (
          <table className="filterExplanations">
            <tbody>
              <tr className="explanation">
                <td className="logo">
                  <img src="/assets/filters/yourteam.png" height="40" width="40" />
                  <div className="filterName">Your Team</div>
                </td>
                <td className="filterDec">
                  Players you have drafted. Does not include their  baggage you haven't drafted yet.
                </td>
              </tr>
              <tr className="explanation">
                <td className="logo">
                  <img src="/assets/filters/yourbags.png" height="40" width="40" />
                  <div className="filterName">Your Baggage</div>
                </td>
                <td className="filterDec">
                  The baggage of your drafted players who haven't been drafted yet.
                </td>
              </tr>
              <tr className="explanation">
                <td className="logo">
                  <img src="/assets/filters/otherteam.png" height="40" width="40" />
                  <div className="filterName">Other Team</div>
                </td>
                <td className="filterDec">
                  Players another team has drafted and their baggage.
                </td>
              </tr>
              <tr className="explanation">
                <td className="logo">
                  <img src="/assets/filters/vectorillegal.png" height="40" width="40" />
                  <div className="filterName">Vector Limited</div>
                </td>
                <td className="filterDec">
                  Players you can not currently draft because of gender limits - you may not draft a player if they or their baggage would make your team have too many players of either gender.
                </td>
              </tr>
              <tr className="explanation">
                <td className="logo">
                  <img src="/assets/filters/genderillegal.png" height="40" width="40" />
                  <div className="filterName">Gender Limited</div>
                </td>
                <td className="filterDec">
                  Players you can not currently draft because of their vector - you may not draft a player whose baggage is less than or equal to any vector of an undrafted player on your team.
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="okBtn" onClick={this.toggleExplantions}>Close</td>
              </tr>
            </tbody>
          </table>
        ) || (
          <div className="filterIcons">
            <div className={[
              'rowFilter', 
              'yourTeam', 
              !rowFilters.viewYourTeam ? 'unfiltered' : 'filtered'
            ].join(' ')}
            onClick={this.filterClickHandler.bind(this, 'viewYourTeam')}>
              <div className="logo">
                <img src="/assets/filters/yourteam.png" height="40" width="40" />
              </div>
              <div className="filterName">Your Team</div>
            </div>
            <div className={[
              'rowFilter', 
              'yourBaggage', 
              !rowFilters.viewYourBaggage ? 'unfiltered' : 'filtered'
            ].join(' ')}
            onClick={this.filterClickHandler.bind(this, 'viewYourBaggage')}>
              <div className="logo">
                <img src="/assets/filters/yourbags.png" height="40" width="40" />
              </div>
              <div className="filterName">Your Baggage</div>
            </div>
            <div className={[
              'rowFilter', 
              'otherTeam', 
              !rowFilters.viewOtherTeam ? 'unfiltered' : 'filtered'
            ].join(' ')}
            onClick={this.filterClickHandler.bind(this, 'viewOtherTeam')}>
              <div className="logo">
                <img src="/assets/filters/otherteam.png" height="40" width="40" />
              </div>
              <div className="filterName">Other Team</div>
            </div>
            <div className={[
              'rowFilter', 
              'undraftableGender', 
              !rowFilters.viewUndraftableGender ? 'unfiltered' : 'filtered'
            ].join(' ')}
            onClick={this.filterClickHandler.bind(this, 'viewUndraftableGender')}>
              <div className="logo">
                <img src="/assets/filters/genderillegal.png" height="40" width="40" />
              </div>
              <div className="filterName">Gender Limited</div>
            </div>
            <div className={[
              'rowFilter', 
              'undraftableVector', 
              !rowFilters.viewUndraftableVector ? 'unfiltered' : 'filtered'
            ].join(' ')}
            onClick={this.filterClickHandler.bind(this, 'viewUndraftableVector')}>
              <div className="logo">
                <img src="/assets/filters/vectorillegal.png" height="40" width="40" />
              </div>
              <div className="filterName">Vector Limited</div>
            </div>
          </div>
        )}
      </InlineCss>
    );
  }
});