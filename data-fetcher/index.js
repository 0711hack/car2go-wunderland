const request = require('request-promise-native');
const config = require('./config.json');

const getLoginToken = () => {
  'use strict';
  
  let data = {
    serviceRequest: {
      payLoadData: {
        emailAddress: config.loginEmail,
        password: config.loginPassword
      }
    }
  };
  
  return request.post({
    url: 'https://common-api-hackathon2017.car2go.io/public/login',
    body: data,
    json: true
  }).then(res => {
    let authorization = res.serviceResponse.payLoadData.authorization;
    if (!authorization) {
      console.log(JSON.stringify(res, null, 2));
      throw 'LoginError';
    }
    return {
      user: authorization.userId,
      token: authorization.accessToken
    };
  }).catch(err => {
    console.log(err);
    throw 'LoginError';
  });
};

const fetchVehicles = auth => {
  'use strict';
  return request.get({
    url: 'https://fmm-api-hackathon2017.car2go.io/protected/vehicles',
    headers: {
      userId: auth.user,
      accessToken: auth.token
    },
    json: true
  }).then(vehicles => {
    console.log(JSON.stringify(vehicles, null, 2));
    return vehicles;
  });
};

const parsePositions = vehicles => {
  'use strict';
  
};

getLoginToken()
  .then(fetchVehicles)
  .then(parsePositions)
  .then(console.log)
  .catch(err => {
    'use strict';
    console.log(`Program failed due to: ${err}`);
  });

