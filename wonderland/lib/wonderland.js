const fs = require('fs');
const maxVehicleCount = 6; // TODO back to 9
const park_offset = 232.957960406; // 5 cm
var currentState = []
var targetState = []

function array_diff(left, right) {
  var result = [];
  for (var i = 0; i < left.length; i++) {
    var miss = true;
    for (var j = 0; j < right.length; j++) {
      if (left[i].x === right[j].x && left[i].y === right[j].y) {
        miss = false;
      }
    }
    if (miss) {
      result.push(i);
    }
  }
  return result;
}

function parkVehicles(vehicles) {
  'use strict';
  var filledVehicles = vehicles;
  var parkedCars = 0;
  for (var i = 0; i < maxVehicleCount; i++) {
    if (filledVehicles[i] === undefined) {
      filledVehicles[i] = {};
      filledVehicles[i].x = 2121;
      filledVehicles[i].y = parkedCars * park_offset;
      parkedCars++;
    }
  }
  return filledVehicles;
}

exports.load = function () {
  'use strict';
  currentState = JSON.parse(fs.readFileSync(`${__dirname}/../state.json`));
  return Promise.resolve(true);
};
exports.save = function () {
  'use strict';
  fs.writeFileSync(`${__dirname}/../state.json`, JSON.stringify(currentState));
  return Promise.resolve(true);
};
exports.setVehicles = function (vehicles) {
  'use strict';
  if (vehicles.length > maxVehicleCount) {
    vehicles = vehicles.slice(0, maxVehicleCount);
  }
  targetState = parkVehicles(vehicles);
  
};
exports.getMoves = function () {
  'use strict';
  var moves = [];
  
  var changesCurrent = array_diff(targetState, currentState);
  var changesTarget = array_diff(currentState, targetState);
  if (changesCurrent.length !== changesTarget.length) {
    console.log('Error, no match for length');
  }
  for (var i = 0; i < changesCurrent.length; i++) {
    moves.push({
      from: currentState[changesCurrent[i]],
      to: targetState[changesTarget[i]]
    });
  }
  let newMoves = [];
  moves.each((move, idx) => {
    let toRemove = false;
    for (let j = 0; j < currentState.length; j++) {
      if (isNearby(move.to.x, move.to.y, currentState[j].x, currentState[j].y)) {
        toRemove = true;
      }
    }
    for (let i = idx + 1; i < moves.length; i++) {
      if (isNearby(move.to.x, move.to.y, moves[i].to.x, moves[i].to.y)) {
        toRemove = true;
      }
    }
  
    if (toRemove) {
      for (let k = 0; k < targetState.length; k++) {
        if (targetState[k].x === move.to.x && targetState[k].y === move.to.y) {
          targetState[k].x = move.from.x;
          targetState[k].y = move.from.y;
        }
      }
    } else {
      newMoves.push(move);
    }
  });
  currentState = targetState;
  return newMoves;
};

const isNearby = (x1, y1, x2, y2) => {
  'use strict';
  return Math.abs(x1 - x2) < 232 && Math.abs(y1 - y2) < 232;
};