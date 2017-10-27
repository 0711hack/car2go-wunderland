const min_lat = 40.7497;
const min_lon = -73.9916;
const factor_lon = 111194.93;
const factor_lat = 84217.17;

exports.convert = (lat, lon) => {
  'use strict';
  
  let y = (lon - min_lon) * factor_lon;
  let x = (lat - min_lat) * factor_lat;
  return ({x, y});
};

// Tests
// console.log(convert(40.76559521425713, -73.98912169836997));
// console.log(convert(40.76474295087877, -73.98200920248443));