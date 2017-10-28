const data = require('./data-fetcher');
const wonderland = require('./wonderland/lib/wonderland.js');
const robot = require('./robot-controller/controller.js');

const processMoves = ([head, ...tail]) => 
  robot.move(head.from.x, head.from.y, head.to.x, head.to.y)
    .then(() => {
      if (tail.length === 0) {
        return true;
      } else {
        return processMoves(tail)
      }
    });

const process = () => {
  'use strict';
  
  return data.fetchData()
    .then(list => {
      console.log(list);
      return list;
    })
    .then(wonderland.setVehicles)
    .then(() => processMoves(wonderland.getMoves()))
    .catch(err => {
      console.log(`Program failed due to: ${err}`);
      return new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    }).then(process);
};

process();