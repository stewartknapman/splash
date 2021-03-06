var fs = require('fs');
var u = require('./utils');
var Data = require('./data');
var Renderer = require('./render');

var Builder = function (data_path, include_path, template_path) {
  this.template_path = template_path;
  this.renderer = new Renderer('build', function (path) {
    path = u.extend_path([include_path, path+'.liquid']);
    return fs.readFileSync(path, 'utf8');
  });
  this.data = new Data(data_path);
};

Builder.prototype.build = function () {
  var data = this.data.collect();
  return this._render_all_templates(data);
};

// Private
Builder.prototype._render_all_templates = function (data) {
  var rendered = {};
  this._for_each_file(this.template_path, function (file) {
    var filename_parts = file.split('.');
    var filename_parts_last = filename_parts[filename_parts.length - 1];
    // only bother with liquid files
    if (filename_parts_last === 'liquid') {
      var filename = filename_parts[0];
      var template_data = this._template_data(filename, data);
      rendered[filename] = this._render_template(file, template_data);
    }    
  });
  return rendered;
};

Builder.prototype._render_template = function (file, template_data) {
  var file_path = u.extend_path([this.template_path, file]);
  var template = fs.readFileSync(file_path, 'utf8');
  return this.renderer.render(template, template_data);
};

Builder.prototype._for_each_file = function (dir_path, callback) {
  var dir = fs.readdirSync(dir_path);
  dir.forEach(function (file, i) {
    callback.apply(this, [file]);
  }, this);
};

Builder.prototype._template_data = function (filename, data) {
  // Pull the template specific data to the top so we can do {{ title }} where title is from [template].json
  var new_data = [];
  if (data[filename]) {
    new_data.push(JSON.stringify(data[filename]).replace(/^{/, "").replace(/}$/, ""));
  }
  new_data.push(JSON.stringify(data).replace(/^{/, "").replace(/}$/, ""));
  return JSON.parse("{"+new_data.join(",")+"}");
};

module.exports = Builder;