var Output = function (output_path) {
  this.output_path = output_path;
};

Output.prototype.output = function (output) {
  console.log(output);
};

module.exports = Output;