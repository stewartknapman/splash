//var Liquid = require('liquid.js');

var Renderer = function (includes_handler) {
  // Handler for liquid includes
//   Liquid.readTemplateFile = includes_handler;
};

Renderer.prototype.render = function (template, data) {
/*
  var liquid = Liquid.parse(template);
  return liquid.render(data);
*/
};

module.exports = Renderer;