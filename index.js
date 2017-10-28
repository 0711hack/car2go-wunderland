const data = require('./data-fetcher');
const wonderland = require('./wonderland/lib/wonderland.js');
const robot = require('./robot-controller/controller.js');

const processMoves = moves => {
  if (moves.length === 0) {
  // TODO logging console.log(`processMoves()`);
    return true;
  }
  const [head, ...tail] = moves;
  // TODO logging console.log(`processMoves(${JSON.stringify(head)})`);
  return robot.move(head.from.x, head.from.y, head.to.x, head.to.y)
    .then(() => {
      if (tail.length === 0) {
        return true;
      } else {
        return processMoves(tail)
      }
    });
};

const safeScale = v => 
  Math.max(0, Math.min(400, v * 0.1)); // TODO faktor richtig????

const safeOffset = v =>
  Math.max(-200, Math.min(200, v - 200));

const safe = xy => ({x: safeOffset(safeScale(xy.x)), y: safeOffset(safeScale(xy.y))});

const process = () => {
  'use strict';
  // TODO logging console.log('process()');
  return wonderland.load()
    .then(data.fetchData)
    /* TODO DEBUG ONLY.then(list => {
      console.log(list);
      return list;
    })*/
    .then(wonderland.setVehicles)
    .then(() => wonderland.getMoves())
    .then(moves => moves.map(move => ({from: safe(move.from), to: safe(move.to)})))
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
