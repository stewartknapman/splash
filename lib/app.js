var fs = require('fs');

var Splash = function (cwd, argv) {
  this.cwd = cwd;
  this.argv = argv;
};

Splash.prototype.build = function () {
  return fs.readdirSync(this.cwd);
};

module.exports = Splash;