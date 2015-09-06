var u = require('./utils');
var Builder = require('./build');
var Outputer = require('./output');

var Splash = function (cwd, options) {
  var data_path = u.extend_path([cwd, (options.data_dir || 'data')]);
  var output_path = u.extend_path([cwd, (options.output_dir || 'build')]);
  var include_path = u.extend_path([cwd, (options.include_dir || 'includes')]);
  var template_path = u.extend_path([cwd, (options.template_dir || 'templates')]);
  
  this.builder = new Builder(data_path, include_path, template_path);
  this.outputer = new Outputer(output_path);
};

Splash.prototype.build = function () {
  return this.builder.build();
};

Splash.prototype.output = function (content) {
  this.outputer.output(content);
};

Splash.prototype.build_and_output = function () {
  this.output(this.build());
};

module.exports = Splash;