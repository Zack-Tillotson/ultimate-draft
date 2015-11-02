import {id, baggageId} from '../../../columnTypes';

export default function(inputs) {
  let idCount = 0, baggageIdCount = 0, foundError = false;

  inputs.forEach((column, index) => {
    if(column.type === id.name) idCount++;
    if(column.type === baggageId.name) baggageIdCount++;
    if(/\.\$\#\[\]\//.test(column.name)) foundError = true;
  });

  return baggageIdCount === 1 && idCount === 1 && !foundError;
}