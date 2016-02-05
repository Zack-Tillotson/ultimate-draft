# Ultimate Draft
Zack Tillotson

## In Action

[DiskDraft](http://DiskDraft.com)

## Development

```
npm install
npm start
open http://localhost:8888/create/
```

## Description

A tool for Ultimate Frisbee draft leagues to use during the draft. 


1. Easy: Quickly see who you are allowed to draft now.
2. Powerful: Updates automatically when another captain picks a player.
3. Fast: Updates instantly with new data.

Easily and quickly view basic information such as who is still available to be drafted and who is on each team as well as more complex information such as who has been implicetly drafted because their baggage was taken and if a player is illigal to draft for each team.

## FAQ
 
 
### Captains

###### What is DiskDraft?
DiskDraft helps Ultimate captains make drafting as easy and fun as possible. Compare players, see who is legal to draft, be informed of other team's choices, review teams at any time, and many more features!

###### Why do I need to log in?
There is sensitive information in a draft, we take the security of this information very seriously. Requiring each participant to log in is the first way we keep your data safe.

###### What is the "Draft Order"?
The top section of the application shows the draft order of the coming teams. Teams draft in "snake" ordering where each team drafts in order, then each team drafts in reverse order. This repeats until the draft is done.

###### What do the player colors mean?
The player background colors correspond to their draft status.
* White means the player is available to draft.
* Blue means the player has been drafted by your team.
* Green means you haven't yet drafted this player but the player is baggaged to a player you have drafted. You will need to draft them before the end of the draft.
* Grey means this player is not currently legal to draft, but will be once you've drafted your team's undrafted baggage. A team is not allowed to draft a player whose vector is less than or equal to any of that team's undrafted baggage's vectors.
* Orange means this player or this player's baggage has been drafted. They are not available for you to draft.
* Pink means this player is not legal to draft. You may only draft a certain number of men and women on your team, by drafting this player you will have too many men or too many women.
Administrators

###### What is DiskDraft?
DiskDraft is an easy to use web application which makes running an Ultimate draft easy. Getting set up before the draft just takes a minute and then at the draft itself the application keeps track of all the teams and drafting rules for you.

###### How do I create a draft?
First make sure you have the information you'll need:
* Spreadsheet of player information.
* The number of teams in the league.
* The name captains and (optionally) a password for the draft.
* An administrator account with DiskDraft.com
Then go to the DiskDraft draft creation page here and follow the wizard.

###### Is the draft information secure?
Yes. The personal information of players is very important and we have taken several steps to keep it safe. All data is sent over secure SSL connections. Captains must log in via a secure authentication method. A draft can further be secured behind a password you set. Finally a draft can be set to hidden once the draft is over, disallowing anyone except you from viewing the draft.

###### How do I change team order, gender limits, draft visibility, etc?
All of these attributes can be changed at any time via the draft administrator tab. These tools are only available to draft administrators.

###### What are captain baggages?
A captain is considered baggaged to their team at the beginning of the draft. These must be entered manually at the beginning of the draft via the administrator panel.

###### How do I undo a draft selection?
The last draft may be removed via the History tab. Click the "X" button to the right of the latest draft to remove it.
### Other stuff

###### About me
Hi! My name is Zack Tillotson and my software company makes great custom web applications. You can get in touch via Twitter, Github, or Email - or draft me and I'll see you on the field! ;]

###### What technology does this application use?
This application is written with React, Redux, and Firebase with heaping helpings of Webpack, babel, and ImmutableJS. Check out the full code base on GitHub.

Copyright 2016 Zachery Tillotson