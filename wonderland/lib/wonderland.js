const fs = require('fs');
const maxVehicleCount = 10;
var currentState = []
var targetState = []
const park_offset = 100;

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
  currentState = JSON.parse(fs.readFileSync("state.json"));
};
exports.save = function() {
  'use strict';
  fs.writeFileSync("state.json", JSON.stringify(currentState));
};
exports.setVehicles = function(vehicles) {
  'use strict';
  //var raw_data = JSON.parse(fs.readFileSync("mock.json"));
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