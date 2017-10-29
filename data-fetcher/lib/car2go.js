const request = require('request-promise-native');
const config = require('../config.json');
const converter = require('./converter.js');

const parseLogin = res => {
  'use strict';
  let authorization = res.serviceResponse.payLoadData.authorization;
  if (!authorization) {
    console.log(JSON.stringify(res, null, 2));
    throw 'LoginError';
  }
  return {
    user: authorization.userId,
    token: authorization.accessToken
  };
};

const parseVehicles = res => {
  'use strict';
  return res.serviceResponse.payLoadData.vehicles.map(vehicle => {
    return {
      id: vehicle.plate,
      lat: vehicle.lat,
      lon: vehicle.lon
    };
  });
};

exports.login = () => {
  'use strict';
  
  let authData = {
    serviceRequest: {
      payLoadData: {
        emailAddress: config.loginEmail,
        password: config.loginPassword
      }
    }
  };
  
  return request.post({
    url: 'https://common-api-hackathon2017.car2go.io/public/login',
    body: authData,
    json: true
  }).then(parseLogin).catch(err => {
    console.log(err);
    throw 'LoginError';
  });
};

exports.fetchVehicles = authData => {
  'use strict';
  return request.get({
    url: 'https://fmm-api-hackathon2017.car2go.io/protected/vehicles',
    headers: {
      userId: authData.user,
      accessToken: authData.token
    },
    json: true
  }).then(parseVehicles);
};

const generateRandomVehicle = id => {
  const latlon = converter.randomLatLon();
  return {
    id: id,
    lat: latlon.lat,
    lon: latlon.lon
  };
};

exports.fetchRandomVehicles = () => {
  return Promise.resolve([
    generateRandomVehicle('veh-1'),
    generateRandomVehicle('veh-2'),
    generateRandomVehicle('veh-3'),
    generateRandomVehicle('veh-4'),
    generateRandomVehicle('veh-5'),
    generateRandomVehicle('veh-6'),
    generateRandomVehicle('veh-7'),
    generateRandomVehicle('veh-8'),
    generateRandomVehicle('veh-9'),
    generateRandomVehicle('veh-10'),
    generateRandomVehicle('veh-11'),
    generateRandomVehicle('veh-12')
  ]);
};