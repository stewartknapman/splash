var fs = require('fs');
var u = require('./utils');
var Renderer = require('./render');

var DataCollector = function (data_path) {
  this.data_path = data_path;
  this.renderer = new Renderer('data', function (path) {
    path = u.extend_path([data_path, path]);
    var json_path = path+'.json';
    var liquid_path = json_path+'.liquid';
    
    if (fs.statSync(liquid_path).isFile()) {
      return fs.readFileSync(liquid_path, 'utf8');
    } else if (fs.statSync(json_path).isFile()) {
      return fs.readFileSync(json_path, 'utf8');
    }
    return '';
  });
};

DataCollector.prototype.collect = function () {
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
        // parse liquid
        content = this.renderer.render(content, {});
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