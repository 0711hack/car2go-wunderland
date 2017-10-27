exports.convert = function(lat, lon){
  var min_lat = 40.7497;
  var min_lon = -73.9916;
  var factor_lon = 111194.93;
  var factor_lat = 84217.17;
  var y = (lon - min_lon)*factor_lon;
  var x = (lat - min_lat)*factor_lat;
  return ({
    "x":x,
    "y":y
  })
}

// Tests
// console.log(convert(40.76559521425713, -73.98912169836997));
// console.log(convert(40.76474295087877, -73.98200920248443));