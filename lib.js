const scale = v =>
  v * 0.2146310;

const offset = v =>
  (v - 230)*(-1);

const safeScale = v => 
  Math.max(0, Math.min(435, scale(v))); 

const safeOffset = v =>
  Math.max(-205, Math.min(230, offset(v)));

const safe = xy => ({x: safeOffset(safeScale(xy.x)), y: safeOffset(safeScale(xy.y))});

exports.scale = scale;
exports.offset = offset;
exports.safe = safe;
