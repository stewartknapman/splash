var utils = {
  
  extend_path: function (parts) {
    return parts.join('/');
  },
  
  log: function () {
    var message = '';
    for (var i = 0; i < arguments.length; i++) {
      message += arguments[i];
    }
    var time = new Date().toLocaleTimeString();
    var timeStr = '['+time+'] ';
    console.log(timeStr, message);
  }
  
};

module.exports = utils;