const data = require('./data-fetcher');
const wonderland = require('./wonderland');

const process = () => {
  'use strict';
  
  return data.fetchData()
    .then(list => {
      console.log(list);
      return list;
    })
    .then(wonderland.setVehicles)
    .catch(err => {
      console.log(`Program failed due to: ${err}`);
      return new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    }).then(process);
};

process();