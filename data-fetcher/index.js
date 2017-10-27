const car2go = require('./lib/car2go');

car2go.login()
  .then(car2go.fetchVehicles)
  .then(console.log)
  .catch(err => {
    'use strict';
    console.log(`Program failed due to: ${err}`);
  });

