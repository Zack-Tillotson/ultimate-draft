// Tranformations using level 1 selectors only

import {createSelector} from 'reselect';

import l2 from '../l2';

import {draftsWithTeamsAndPlayers} from './drafts';
import {draftOrder, statusWithDraftInfo} from './status';
import {teamsWithPlayers, teamsWithPlayersMap} from './teams';
import {uiWithData} from './ui';


export default { ...l2, draftsWithTeamsAndPlayers, draftOrder, statusWithDraftInfo, teamsWithPlayers, teamsWithPlayersMap, uiWithData };