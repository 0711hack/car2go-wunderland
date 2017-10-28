const request = require('request-promise-native');

const ENDPOINT_URL = 'http://10.200.21.55:8080';

const sendMove = (x, y, z) => 
  request({
    method: 'POST',
    uri: `${ENDPOINT_URL}/v1/opcua`,
    json: true,
    body: {
      ascOpcuaProfiles: [{
        id: '1',
        lrXPos: `${x}`,
        lrYPos: `${y}`,
        lrZPos: `${z}`,
        lrAux1Pos: '250',
        lrPathVel: '1000',
        lrPathAcc: '10000',
        lrPathDec: '10000',
        lrBlendingRadius: '100'
      }, {
        id: '2',
        lrXPos: `${x}`,
        lrYPos: `${y}`,
        lrZPos: `${z}`,
        lrAux1Pos: '250',
        lrPathVel: '0', // set velocity to zero to stop the move
        lrPathAcc: '10000',
        lrPathDec: '10000',
        lrBlendingRadius: '100'
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
  sendMove(x, y, z)
    .then(stopMove)
    .then(awaitMove);

const grip = close => {};

exports.move = (x1, y1, x2, y2) => move(x1, y1, x2, y2);


//x -250 - 250
//y -210 - 210
//z -625 - -685
move(-100, 50, -685)
  .then(() => console.log('done'));
