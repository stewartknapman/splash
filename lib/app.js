var Data = require('./data');
var u = require('./utils');

var Splash = function (cwd, argv) {
  this.cwd = cwd;
  this.argv = argv;
  
  var data_path = u.extend_path([this.cwd, (this.argv.d || this.argv.data || 'data')]);
  this.data = new Data(data_path);
};

Splash.prototype.build = function () {
  var data = this.data.collect();
  return data;
};

module.exports = Splash;