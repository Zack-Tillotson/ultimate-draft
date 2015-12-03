import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    status: React.PropTypes.object.isRequired
  },

  getDrafts() {
    return this.props.status.draftOrder.length > 0
      ? this.props.status.draftOrder.slice(0, 10)
      : [];
  },

  getCurrentDraft() {
    return this.getDrafts().length > 0
      ? this.getDrafts()[0]
      : {};
  },

  getDraftList() {
    const draftArrayArray = this.getDrafts().map((draftOrder, index) => {
      const currentClass = draftOrder.current ? 'current' : '';
      const teamColor = draftOrder.team.color;
      const teamName = draftOrder.team.name;
      const draftNum = draftOrder.draftNum;

      const retArray = [];

      if(draftOrder.startOfRound && !draftOrder.current) {
        retArray.push(
          <td className="roundSep">Round {draftOrder.round}</td>
        );
      }
      retArray.push(
        <td 
          className={["draftOrder", currentClass].join(' ')}
          key={index}>
          <div className="draftNum">
            {draftOrder.current ? (
              'Now Drafting'
            ) : (
              draftNum
            )}
          </div>
          <div className="draftOrderTeam" style={{borderBottomColor: teamColor}}>
            {teamName}
          </div>
        </td>
      );
      return retArray;
    });

    let ret = [];
    draftArrayArray.forEach(ary => {
      ret = ret.concat(ary);
    })
    return ret;
  },

  render() {
    const roundNum = this.getCurrentDraft()['round'];
    const draftNum = this.getCurrentDraft()['draftNum'];
    const draftCount = this.props.status.draftCount;
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <table>
          <tbody>
            <tr>
              <td className="title">
                <div className="round">Round {roundNum}</div>
                <div className="draft">Draft {draftNum} of {draftCount}</div>
              </td>
              {this.getDraftList()}
            </tr>
          </tbody>
        </table>
      </InlineCss>
    );
  }
});