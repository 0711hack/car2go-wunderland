const car2go = require('./lib/car2go');
const converter = require('./lib/converter');

const convertLocations = vehicles => {
  'use strict';
  return vehicles.map(vehicle => {
    let converted = converter.convert(vehicle.lat, vehicle.lon);
    return {
      id: vehicle.id,
      x: converted.x,
      y: converted.y
    };
  });
};

car2go.login()
  .then(car2go.fetchVehicles)
  .then(convertLocations)
  .then(console.log)
  .catch(err => {
    'use strict';
    console.log(`Program failed due to: ${err}`);
  });

