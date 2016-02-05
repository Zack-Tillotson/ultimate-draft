import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

const faqData = [{
  sectionName: 'Captains',
  questions: [{
    title: 'What is DiskDraft?',
    answer: 'DiskDraft helps Ultimate captains make drafting as easy and fun as possible. Compare players, see who is legal to draft, be informed of other team\'s choices, review teams at any time, and many more features!'
  }, {
    title: 'Why do I need to log in?',
    answer: 'There is sensitive information in a draft, we take the security of this information very seriously. Requiring each participant to log in is the first way we keep your data safe.'
  }, {
    title: 'What is the "Draft Order"?',
    answer: 'The top section of the application shows the draft order of the coming teams. Teams draft in "snake" ordering where each team drafts in order, then each team drafts in reverse order. This repeats until the draft is done.'
  }, {
    title: 'What do the player colors mean?',
    answer: (
      <div className="playerColors">
        The player background colors correspond to their draft status.
          <ul>
            <li><div className="colorSquare white" />White means the player is available to draft.</li>
            <li><div className="colorSquare blue" />Blue means the player has been drafted by your team.</li>
            <li><div className="colorSquare green" />Green means you haven't yet drafted this player but the player is baggaged to a player you have drafted. You will need to draft them before the end of the draft.</li>
            <li><div className="colorSquare grey" />Grey means this player is not currently legal to draft, but will be once you've drafted your team's undrafted baggage. A team is not allowed to draft a player whose vector is less than or equal to any of that team's undrafted baggage's vectors.</li>
            <li><div className="colorSquare orange" />Orange means this player or this player's baggage has been drafted. They are not available for you to draft.</li>
            <li><div className="colorSquare pink" />Pink means this player is not legal to draft. You may only draft a certain number of men and women on your team, by drafting this player you will have too many men or too many women.</li>
          </ul>
      </div>
    )
  }
]}, {
  sectionName: 'Administrators',
  questions: [{
    title: 'What is DiskDraft?',
    answer: 'DiskDraft is an easy to use web application which makes running an Ultimate draft easy. Getting set up before the draft just takes a minute and then at the draft itself the application keeps track of all the teams and drafting rules for you.'
  }, {
    title: 'How do I create a draft?',
    answer: (
      <div>
        First make sure you have the information you'll need:
        <ol>
          <li>Spreadsheet of player information.</li>
          <li>The number of teams in the league.</li>
          <li>The name captains and (optionally) a password for the draft.</li>
          <li>An administrator account with DiskDraft.com</li>
        </ol>

        Then go to the DiskDraft draft creation page <a href="/create/">here</a> and follow the wizard.
      </div>
    )
  }, {
    title: 'Is the draft information secure?',
    answer: 'Yes. The personal information of players is very important and we have taken several steps to keep it safe. All data is sent over secure SSL connections. Captains must log in via a secure authentication method. A draft can further be secured behind a password you set. Finally a draft can be set to hidden once the draft is over, disallowing anyone except you from viewing the draft.'
  }, {
    title: 'How do I change team order, gender limits, draft visibility, etc?',
    answer: 'All of these attributes can be changed at any time via the draft administrator tab. These tools are only available to draft administrators.'
  }, {
    title: 'What are captain baggages?',
    answer: 'A captain is considered baggaged to their team at the beginning of the draft. These must be entered manually at the beginning of the draft via the administrator panel.'
  }, {
    title: 'How do I undo a draft selection?',
    answer: 'The last draft may be removed via the History tab. Click the "X" button to the right of the latest draft to remove it.'
  }]
}, {
  sectionName: 'Other stuff',
  questions: [{
    title: 'About me',
    answer: (
      <div>
        Hi! My name is Zack Tillotson and <a href="http://ZacheryTillotson.com">my software company</a> makes great custom web applications. You can get in touch via <a href="https://twitter.com/ZackTillotson">Twitter</a>, <a href="https://github.com/Zack-Tillotson">Github</a>, or <a href="mailto:ZackTillotson@gmail.com">Email</a> - or draft me and I'll see you on the field! ;]
      </div>
    )
  }, {
    title: 'What technology does this application use?',
      answer: (
        <div>
          This application is written with React, Redux, and Firebase with heaping helpings of Webpack, babel, and ImmutableJS. Check out the full code base on <a href="https://github.com/Zack-Tillotson/ultimate-draft">GitHub.</a>
        </div>
      )
  }]
}];

export default React.createClass({

  propTypes: {
    
  },

  render() {

    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h1>FAQ</h1>
        {faqData.map(section => (
          <section key={section.sectionName}>
            <h2>{section.sectionName}</h2>
            <div className="faqItems">
              {section.questions.map(question => {
                return (
                  <div className="faqItem" key={question.title}>
                    <div className="faqTitle">
                      {question.title}
                    </div>
                    <div className="faqAnswer">
                      {question.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </InlineCss>
    );
  }
});