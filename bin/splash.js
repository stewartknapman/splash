#!/usr/bin/env node

var fs      = require('fs');
var chalk   = require('chalk');
var u       = require('../lib/utils');
var Splash  = require('../lib/app.js');

var argv    = require('minimist')(process.argv.slice(2));
var cwd     = process.cwd();
var options = {
  data_dir:     (argv.d || argv.data || 'data'),
  output_dir:   (argv.o || argv.output || 'build'),
  include_dir:  (argv.i || argv.includes || 'includes'),
  template_dir: (argv.t || argv.templates || 'templates')
};

var splash  = new Splash(cwd, options);

function build_and_output () {
  u.log(chalk.blue('Building files.'));
  var build = splash.build();
  u.log(chalk.blue('Outputting built files.'));
  splash.output(build);
  u.log(chalk.blue('Done.'));
}

switch (argv._[0]) {
  case 'watch':
    // Note: watch can fire mlitple times: http://stackoverflow.com/questions/12978924/fs-watch-fired-twice-when-i-change-the-watched-file
    // maybe look at implimenting this later: https://github.com/paulmillr/chokidar
    u.log(chalk.blue('Starting splash watch: '), chalk.magenta(cwd));
    fs.watch(cwd, { recursive: true }, function (event, fname) {
      var build = true;
      if (fname) {
        var dir = fname.split('/')[0];
        if (dir === flags.output_dir) build = false; // don't build on the build dir
      }
      if (build) build_and_output();
    });
    break;
    
  case 'serve':
    // TODO:
    // setup server, run splash.build() and serve output
    // watch files for change
    // on change run splash.build() and reload
    u.log(chalk.red('SPLASH TODO: serve'));
    break;
    
  case 'generate':
    // TODO:
    // create dirs,
    // add a config file to check against for custom naming of dirs
    u.log(chalk.red('SPLASH TODO: generate'));
    break;
    
  default:
    u.log(chalk.blue('Starting splash build: '), chalk.magenta(cwd));
    build_and_output();
}