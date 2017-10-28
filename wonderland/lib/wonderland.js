const fs = require('fs');
const maxVehicleCount = 9;
const park_offset = 500; // 5 cm in mm
var currentState = []
var targetState = []

function array_diff(left, rigth) {
  var result = [];
  for (var i = 0; i < left.length; i++) {
    var miss = true;
    for (var j = 0; j < rigth.length; j++) {
      if (left[i].x == rigth[j].x && left[i].y == rigth[j].y) {
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
      filledVehicles[i].x = 0;
      filledVehicles[i].y = parkedCars * park_offset;
      parkedCars++;
    }
  }
  return filledVehicles;
}

exports.load = function() {
  'use strict';
  currentState = JSON.parse(fs.readFileSync(`${__dirname}/../state.json`));
  return Promise.resolve(true);
};
exports.save = function() {
  'use strict';
  fs.writeFileSync(`${__dirname}/../state.json`, JSON.stringify(currentState));
  return Promise.resolve(true);
};
exports.setVehicles = function(vehicles) {
  'use strict';
  if(vehicles.length > maxVehicleCount){
    vehicles = vehicles.slice(0,maxVehicleCount);
  }
  targetState = parkVehicles(vehicles);

};
exports.getMoves = function() {
  'use strict';
  var moves = [];

  var changesCurrent = array_diff(targetState, currentState);
  var changesTarget = array_diff(currentState, targetState);
  if (changesCurrent.length != changesTarget.length) {
    console.log("Error, no match for length");
  }
  for (var i = 0; i < changesCurrent.length; i++) {
    moves.push({
      "from":currentState[changesCurrent[i]],
      "to":targetState[changesTarget[i]]
    });
  }
  currentState = targetState;
  return moves;
};