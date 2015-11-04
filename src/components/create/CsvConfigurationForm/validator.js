import {id, baggageId, vector} from '../../../columnTypes';

export default function(inputs) {
  let idCount = 0, baggageIdCount = 0, vectorCount = 0, foundError = false;

  Object.keys(inputs).forEach((key, index) => {
    const column = inputs[key];
    if(column.type === id.name) idCount++;
    if(column.type === baggageId.name) baggageIdCount++;
    if(column.type === vector.name) vectorCount++;
  });

  Object.keys(inputs).forEach((key, index) => {
    const column = inputs[key];
    let valid = true;
    if(column.type === id.name) valid = idCount === 1;
    if(column.type === baggageId.name) valid = baggageIdCount === 1;
    if(column.type === vector.name) valid = vectorCount === 1;
    if(/\.\$\#\[\]\//.test(column.name)) valid = false;
    
    if(!valid) foundError = true;

    column.valid = valid;
  });


  if(idCount !== 1 || baggageIdCount !== 1 || vectorCount !== 1) {
    foundError = true;
  }

  return !foundError;
}