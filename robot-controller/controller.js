const request = require('request-promise-native');

const ENDPOINT_URL = 'http://10.200.21.55:8080';
const Z_DOWN = '-685';
const Z_UP = '-670';
const VELOCITY = '1000';
const ACC = '10000';
const DEC = '10000';
const AUX1POS = '250';
const Blending_READIUS = '100';

const sendMove = (x1, y1, x2, y2) => 
  request({
    method: 'POST',
    uri: `${ENDPOINT_URL}/v1/opcua`,
    json: true,
    body: {
      ascOpcuaProfiles: [{
        id: '1',
        lrXPos: `${x1}`,
        lrYPos: `${y1}`,
        lrZPos: Z_DOWN,
        lrAux1Pos: AUX1POS,
        lrPathVel: VELOCITY,
        lrPathAcc: ACC,
        lrPathDec: DEC,
        lrBlendingRadius: Blending_READIUS
      }, {
        id: '2',
        lrXPos: `${x1}`,
        lrYPos: `${y1}`,
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
        lrZPos: Z_UP,
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
        lrPathVel: VELOCITY,
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
      }],
      w_Mode_Select_Opc: '7',
      x_StartMode: true,
      x_AbortMode: false,
      x_ResetErrorOpc: false,
      eSelectAxisOpc: 'Z'
    }
  });

const stopMove = () => 
  request({
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

const awaitMove = () => 
  request({
    method: 'GET',
    uri: `${ENDPOINT_URL}/v1/opcua/module/state`,
    json: true
  })
    .then((body) => {
      console.log(body.xDone);
      if (body.xDone === true) {
        return body;
      } else {
        return awaitMove();
      }
    });

const move = (x1, y1, x2, y2) => 
  sendMove(x1, y1, x2, y2)
    .then(stopMove)
    .then(awaitMove);

const grip = close => {};

exports.move = (x1, y1, x2, y2) => move(x1, y1, x2, y2);


//x -250 - 250
//y -210 - 210
//z -685 - -625
move(-100, 50, -200, 100)
  .then(() => console.log('done'));
