import {createSelector} from 'reselect';
import {draft} from '../';

export const maxGenderDrafts = createSelector(draft, (draft) => {
  let {maxMen, maxWomen} = draft;
  maxMen = parseInt(maxMen);
  maxWomen = parseInt(maxWomen);
  return {maxMen, maxWomen};
});

export const draftMeta = createSelector(draft, draft => {
  const {draftId, draftPw, owner} = draft;
  return {draftId, draftPw, owner};
});