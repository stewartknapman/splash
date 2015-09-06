var Data = require('./data');

var Builder = function (data_path, include_path, template_path) {
  this.data = new Data(data_path);
};

Builder.prototype.build = function () {
  var data = this.data.collect();
  return data;
};

module.exports = Builder;