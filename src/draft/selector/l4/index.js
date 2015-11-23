// Tranformations using lower level selectors only

import {createSelector} from 'reselect';

import l3 from '../l3';

import {draftsWithTeamsAndPlayers} from './drafts';
import {draftOrder, statusWithDraftInfo} from './status';
import {teamsWithPlayers, teamsWithPlayersMap} from './teams';
import {uiWithData} from './ui';


export default { ...l3, draftsWithTeamsAndPlayers, draftOrder, statusWithDraftInfo, teamsWithPlayers, teamsWithPlayersMap, uiWithData };