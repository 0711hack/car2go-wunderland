const minLat = 40.7497;
const maxLat = 40.7687;
const minLon = -73.9916;
const maxLon = -73.9656;
const factorLat = 111194.93; //m
const factorLon = 84217.17; //m

exports.convert = (lat, lon) => {
  'use strict';

  let y = (lon - minLon) * factorLon;
  let x = (lat - minLat) * factorLat;
  return ({x, y});
};

exports.randomLatLon = () => {
  return {
    lat: minLat + (maxLat - minLat) * Math.random(),
    lon: minLon + (maxLon - minLon) * Math.random()
  };
};

// Tests
// console.log(convert(40.76559521425713, -73.98912169836997));
// console.log(convert(40.76474295087877, -73.98200920248443));