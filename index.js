const data = require('./data-fetcher');
const wonderland = require('./wonderland/lib/wonderland.js');
const robot = require('./robot-controller/controller.js');
const lib = require('./lib.js');


const processMoves = moves => {
  if (moves.length === 0) {
  // TODO logging console.log(`processMoves()`);
    return true;
  }
  const [head, ...tail] = moves;
  // TODO logging console.log(`processMoves(${JSON.stringify(head)})`);
  return robot.move(head.from.x, head.from.y, head.to.x, head.to.y)
    .then(() => processMoves(tail));
};

const process = () => {
  'use strict';
  // TODO logging console.log('process()');
  return wonderland.load()
    .then(data.fetchData)
    .then(list => {
      console.log(list);
      return list;
    })
    .then(wonderland.setVehicles)
    .then(wonderland.getMoves)
    .then(moves => moves.map(move => ({from: lib.safe(move.from), to: lib.safe(move.to)})))
    .then(processMoves)
    .then(wonderland.save)
    .catch(err => {
      console.log(`Program failed due to: ${err}`, err.stack);
      return new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    })
    .then(process);
};

process()
  .then(() => console.log('done'));
