function defaultSort(a,b) {
  if(a < b) {
    return -1;
  } else if(b < a) {
    return 1;
  } else {
    return 0;
  }
}

function numberSort(a,b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a - b;
}

function heightSort(a,b) {
  let res = a.match(/([0-9]+)'([0-9]*)"/);
  a = parseInt(res[1]) * 12 + parseInt(res[2]);

  res = b.match(/([0-9]+)'([0-9]*)"/);
  b = parseInt(res[1]) * 12 + parseInt(res[2]);

  return numberSort(a,b);
}

function boolSort(a,b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  if(a == 'no') {
    a = false;
  } else {
    a = !!a;
  }

  if(b == 'no') {
    b = false;
  } else {
    b = !!b;
  }

  if(a && !b) {
    return -1;
  } else if(!a && b) {
    return 1;
  } else {
    return 0;
  }
}

export const id = {
  name: 'ID', 
  description: 'The unique player ID', 
  unique: true, 
  required: true,
  sort: numberSort
};

export const baggageId = {
  name: 'Baggage ID', 
  description: 'The ID of this player\'s baggage', 
  unique: true, 
  required: true,
  sort: numberSort
};

export const vector = {
  name: 'Vector', 
  description: 'The unique player ability vector', 
  unique: true, 
  required: true,
  sort: numberSort
};

export const height = {
  name: 'Height', 
  description: 'A players height in inches and feet', 
  unique: false, 
  required: false,
  sort: heightSort
};

export const number = {
  name: 'Number', 
  description: 'A numerical value', 
  unique: false, 
  required: false, 
  sort: numberSort
}

export default [
  {name: 'Text', description: 'Words and such', unique: false, required: false, sort: defaultSort},
  {name: 'Boolean', description: 'Exists or not', unique: false, required: false, sort: boolSort},
  id, baggageId, vector, height, number
];