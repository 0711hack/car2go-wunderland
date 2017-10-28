const request = require('request-promise-native');
const config = require('../config.json');

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