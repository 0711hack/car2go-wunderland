const robot = require('./controller.js');

robot.position(230, 230, true)
  .then(() => console.log('done'));
