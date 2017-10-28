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

exports.fetchData = () => {
  'use strict';
  return car2go.login()
    .then(car2go.fetchVehicles)
    .then(convertLocations);
};


