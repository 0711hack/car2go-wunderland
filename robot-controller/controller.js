const request = require('request-promise-native');

//const ENDPOINT_URL = 'http://10.200.21.55:8080'; // sim
const ENDPOINT_URL = 'http://10.200.21.54:8080'; // prod
//const ENDPOINT_URL = 'http://10.200.20.80:8080'; // local
const Z_DOWN = '-650';
const Z_UP = '-625';
const VELOCITY = '1000'; // 'max 1000'; // mm/sec
const ACC = '10000';
const DEC = '10000';
const AUX1POS = '90';
const Blending_READIUS = '50';

let lastXY = request({
  method: 'GET',
  uri: `${ENDPOINT_URL}/v1/opcua/module/state`,
  json: true
})
  .then((body) => {
    // TODO logging console.log(`lastXY: body := ${JSON.stringify(body.alrActPos)}`);
    const [x, y] = body.alrActPos;
    return [`${x}`, `${y}`];
  });

const timer = ms => new Promise(function(resolve) {
  // TODO logging console.log(`timer(${ms})`);
  setTimeout(() => resolve(), ms);
});

const sendGrip = close => {
  // TODO logging console.log(`sendGrip(${close})`);
  return request({
    method: 'POST',
    uri: `${ENDPOINT_URL}/v1/opcua`,
    json: true,
    body: {
      ascOpcuaProfiles: [],
      w_Mode_Select_Opc: '7',
      x_StartMode: false,
      x_AbortMode: false,
      x_ResetErrorOpc: false,
      eSelectAxisOpc: 'Z',
      x_GripperOut: close,
      w_GripperOpenValue: (close === true) ? '50' : '150'
    }
  });
};

const sendMove = (x1, y1, x2, y2) => {
  console.log(`sendMove(${x1}, ${y1}, ${x2}, ${y2})`);
  return request({
    method: 'POST',
    uri: `${ENDPOINT_URL}/v1/opcua`,
    json: true,
    body: {
      ascOpcuaProfiles: [{
        id: '1',
        lrXPos: `${x1}`,
        lrYPos: `${y1}`,
        lrZPos: Z_UP,
        lrAux1Pos: AUX1POS,
        lrPathVel: VELOCITY,
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '2',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_UP,
        lrAux1Pos: AUX1POS,
        lrPathVel: VELOCITY,
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '3',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: VELOCITY,
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '4',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '5',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '6',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '7',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '8',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '9',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '10',
        lrXPos: `${x2}`,
        lrYPos: `${y2}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }],
      w_Mode_Select_Opc: '7',
      x_StartMode: true,
      x_AbortMode: false,
      x_ResetErrorOpc: false,
      eSelectAxisOpc: 'Z'
    }
  });
};

const stopMove = () => {
  // TODO logging console.log('stopMove()');
  return request({
    method: 'POST',
    uri: `${ENDPOINT_URL}/v1/opcua`,
    json: true,
    body: {
      ascOpcuaProfiles: [],
      w_Mode_Select_Opc: '7',
      x_StartMode: false,
      x_AbortMode: false,
      x_ResetErrorOpc: false,
      eSelectAxisOpc: 'Z'
    }
  });
};

const awaitDone = () => {
  // TODO logging console.log('awaitDone()');
  return request({
    method: 'GET',
    uri: `${ENDPOINT_URL}/v1/opcua/module/state`,
    json: true
  })
    .then((body) => {
      // TODO logging console.log(`awaitDone(): xDone := ${body.xDone}`);
      if (body.xDone === true) {
        return body;
      } else {
        return awaitDone();
      }
    });
};

const move = (x1, y1, x2, y2) => {
  const p = lastXY
    .then(([x, y]) => 
      sendMove(x, y, x1, y1)
        .then(stopMove)
        .then(awaitDone)
        .then(() => sendGrip(false))
        .then(() => timer(500))
        .then(() => sendMove(x1, y1, x2, y2))
        .then(stopMove)
        .then(awaitDone)
        .then(() => sendGrip(true))
        .then(() => timer(500))
    );
  lastXY = Promise.resolve([x2, y2]);
  return p;
};

const position = (x1, y1) => {
  const p = lastXY
    .then(([x, y]) => 
      sendMove(x, y, x1, y1)
        .then(stopMove)
        .then(awaitDone)
    );
  lastXY = Promise.resolve([x1, y1]);
  return p;
};

exports.move = move;
exports.position = position;
