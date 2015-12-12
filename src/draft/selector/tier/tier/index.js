// Tranformations using level 0 selectors only

import {createSelector} from 'reselect';

import selectors from '../';
import {orderedDraftIds, nextDraft} from './drafts';
import {fullColumns} from './columns';
import {maxGenderDrafts, draftMeta} from './draft';

export default { 
  ...selectors, orderedDraftIds, nextDraft, fullColumns, maxGenderDrafts, draftMeta,
};