var fs = require('fs');
var u = require('./utils');

var Output = function (output_path) {
  this.output_path = output_path;
};

Output.prototype.output = function (output) {
  if (this._check_for_output_dir()) {
    this._build_output_files(output);
  }
};

// Private

Output.prototype._check_for_output_dir = function () {
  // check to see if we have the output dir; if not, make it
  try {
    if (fs.statSync(this.output_path).isDirectory()) return true;
  } catch (e) {
    fs.mkdir(this.output_path);
    return true;
  }
};

Output.prototype._build_output_files = function (output) {
  for (var filename in output) {
    if (output.hasOwnProperty(filename)) {
      var filepath = u.extend_path([this.output_path, filename+'.html']);
      var content = output[filename];
      fs.writeFileSync(filepath, content, 'utf8');
    }
  }
};

module.exports = Output;