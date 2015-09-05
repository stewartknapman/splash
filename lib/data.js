var fs = require('fs');
var u = require('./utils');

var DataCollector = function (data_path) {
  this.data_path = data_path;
};

DataCollector.prototype.collect = function () {
  // TODO:
  // - parse .json.liquid files
  // - handle error if we don't have a data dir
  
  var path;
  var objectname;
  var content;
  var contents = [];
  var files = fs.readdirSync(this.data_path);
  
  files.forEach(function (filename) {
    if (this._is_json(filename)) {
      path = u.extend_path([this.data_path, filename]);
      objectname = filename.split('.')[0];
      content = fs.readFileSync(path, 'utf8');
      if (this._is_liquid(filename)) {
        content = content; // parse liquid
      }
      content = content.replace(/^{/, "").replace(/}$/, "");
      content = '"'+objectname+'": {'+content+'}';
  		contents.push(content);
		}
  }, this);
  
  return JSON.parse("{"+contents.join(",")+"}");
};

DataCollector.prototype._is_json = function (filename) {
  var parts = filename.split('.');
  return parts[parts.length-1] == 'json' || parts[parts.length-2] == 'json';
};

DataCollector.prototype._is_liquid = function (filename) {
  var parts = filename.split('.');
  return parts[parts.length-1] == 'liquid';
};

module.exports = DataCollector;