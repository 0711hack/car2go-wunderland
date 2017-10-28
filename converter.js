//const lat = 40.7497;
//const lon = -73.9916;
const lat = 40.7687;
const lon = -73.9656

const lib = require('./lib.js');
const xy = require('./data-fetcher/lib/converter.js').convert(lat, lon);

console.log(xy);
console.log([lib.offset(lib.scale(xy.x)), lib.offset(lib.scale(xy.y))]);

console.log([lib.offset(lib.scale(0)), lib.offset(lib.scale(0))]);
console.log([lib.offset(lib.scale(2121)), lib.offset(lib.scale(2121))]);