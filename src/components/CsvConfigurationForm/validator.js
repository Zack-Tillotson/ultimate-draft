import {id, baggageId} from './columnTypes';

export default function(inputs) {
  let foundId = false, foundBaggageid = false;

  inputs.forEach((column, index) => {
    if(column.type === id.name) foundId = true;
    if(column.type === baggageId.name) foundBaggageid = true;
  });

  return foundBaggageid && foundId;
}