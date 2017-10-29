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

const filterLocations = locations => 
  locations.filter(location => location.x < 1900); // prevent cars to be placed on the parking space

const areDuplicate = (locationA, locationB) => // prevent multiple cars to be stacked on top of each other
  Math.abs(locationA.x - locationB.x) < 232 &&
  Math.abs(locationA.y - locationB.y) < 232;

const removeDuplicates = locations =>
  locations.filter((locationA, i) => 
    !locations
      .slice(i + 1) // start with the locations after locationA
      .find(locationB => areDuplicate(locationA, locationB)));

exports.filterLocations = filterLocations;
exports.areDuplicate = areDuplicate;
exports.removeDuplicates = removeDuplicates;
exports.fetchData = () => {
  'use strict';
  return car2go.login()
    .then(car2go.fetchVehicles)
    .then(convertLocations)
    .then(filterLocations)
    .then(removeDuplicates);
};
