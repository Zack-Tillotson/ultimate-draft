// Tranformations using lower level selectors only

import {createSelector} from 'reselect';

import selectors from '../';

import {draftsWithTeamsAndPlayers, baggageDraftsWithTeamsAndPlayers} from './drafts';
import {draftOrder, statusWithDraftInfo} from './status';
import {teamsWithPlayers, teamsWithPlayersMap} from './teams';
import {uiWithData} from './ui';


export default { ...selectors, draftsWithTeamsAndPlayers, baggageDraftsWithTeamsAndPlayers, draftOrder, statusWithDraftInfo, teamsWithPlayers, teamsWithPlayersMap, uiWithData };