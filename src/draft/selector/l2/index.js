// Tranformations using level 1 selectors only

import {createSelector} from 'reselect';

import {players, ui, drafts, user, columns, firebase, teams, fullColumns, orderedDraftIds, nextDraft, previousDrafts, playersWithBaggage, 
    playerMap, teamMap} from '../l1';

import {draftsWithTeamsAndPlayers} from './drafts';
import {userWithData} from './user';
import {draftOrder, statusWithDraftInfo} from './status';
import {teamsWithPlayers} from './teams';
import {uiWithData} from './ui';


export default {
  players, ui, drafts, user, columns, firebase, teams, fullColumns, orderedDraftIds, nextDraft, statusWithDraftInfo, previousDrafts, 
  playersWithBaggage, playerMap, teamMap, draftsWithTeamsAndPlayers, uiWithData, draftOrder, teamsWithPlayers
}