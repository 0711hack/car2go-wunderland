const request = require('request-promise-native');

const ENDPOINT_URL = 'http://10.200.21.55:8080';
const Z_DOWN = '-685';
const Z_UP = '-650';
const VELOCITY = '50'; // '1000'; // mm/sec
const ACC = '10000';
const DEC = '10000';
const AUX1POS = '250';
const Blending_READIUS = '100';

let lastXY = request({
  method: 'GET',
  uri: `${ENDPOINT_URL}/v1/opcua/module/state`,
  json: true
})
  .then((body) => {
    console.log(`lastXY: body := ${JSON.stringify(body.alrActPos)}`);
    const [x, y] = body.alrActPos;
    return [`${x}`, `${y}`];
  });

const sendMove = (x1, y1, x2, y2, close) => {
  console.log(`sendMove(${x1}, ${y1}, ${x2}, ${y2}, ${close})`);
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
      eSelectAxisOpc: 'Z',
      w_GripperOpenValue: (close === true) ? '0' : '255'
    }
  });
};

const stopMove = () => {
  console.log('stopMove()');
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

const awaitMove = () => {
  console.log('awaitMove()');
  return request({
    method: 'GET',
    uri: `${ENDPOINT_URL}/v1/opcua/module/state`,
    json: true
  })
    .then((body) => {
      console.log(`awaitMove(): xDone := ${body.xDone}`);
      if (body.xDone === true) {
        return body;
      } else {
        return awaitMove();
      }
    });
};

const move = (x1, y1, x2, y2) => {
  const p = lastXY
    .then(([x, y]) => 
      sendMove(x, y, x1, y1, true)
        .then(stopMove)
        .then(awaitMove)
        .then(() => sendMove(x1, y1, x2, y2, false))
        .then(stopMove)
        .then(awaitMove)
    );
  lastXY = Promise.resolve([x2, y2]);
  return p;
};

exports.move = move;


//x -250 - 250
//y -210 - 210
//z -685 - -625
move(-100, 50, -200, 100)
  .then(() => console.log('done'));
