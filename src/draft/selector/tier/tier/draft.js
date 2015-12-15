import {createSelector} from 'reselect';
import {draft} from '../';

export const maxGenderDrafts = createSelector(draft, (draft) => {
  let {maxMen, maxWomen} = draft;
  maxMen = parseInt(maxMen);
  maxWomen = parseInt(maxWomen);
  return {maxMen, maxWomen};
});