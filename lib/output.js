var fs = require('fs');

var SplashOut = function (cwd, argv) {
  this.cwd = cwd;
  this.argv = argv;
};

SplashOut.prototype.output = function (output) {
  console.log(output);
};

module.exports = SplashOut;