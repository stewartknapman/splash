#!/usr/bin/env node

var fs = require('fs');
var chalk = require('chalk');
var u = require('../lib/utils');
var Splash = require('../lib/app.js');
var SplashOut = require('../lib/output.js');

var argv = require('minimist')(process.argv.slice(2));
var cwd = process.cwd();
var output_dir = (argv.o || argv.output || 'build');

var splash = new Splash(cwd, argv);
var splash_out = new SplashOut(cwd, argv);

var build_and_output = function () {
  u.log(chalk.blue('Building files.'));
  var build = splash.build();
  u.log(chalk.blue('Outputting built files.'));
  //splash_out.output(build);
  u.log(chalk.blue('Done.'));
};

switch (argv._[0]) {
  case 'watch':
    // watch files for change
    // on change run splash.build()
    // output build files to build dir
    u.log(chalk.blue('Starting splash watch: '), chalk.magenta(cwd));
    // Note: watch can fire mlitple times: http://stackoverflow.com/questions/12978924/fs-watch-fired-twice-when-i-change-the-watched-file
    //  maybe look at implimenting this later: https://github.com/paulmillr/chokidar
    fs.watch(cwd, { recursive: true }, function (event, fname) {
      // u.log('WATCH: ', event, ' ', fname);
      // don't build on the build dir
      var build = true;
      if (fname) {
        var dir = fname.split('/')[0];
        if (dir === output_dir) build = false;
      }
      if (build) build_and_output();
    });
    break;
  case 'serve':
    // setup server, run splash.build() and serve output
    // watch files for change
    // on change run splash.build() and reload
    u.log(chalk.red('SPLASH: serve'));
    break;
  default:
    // build files once
    // output them to build dir
    u.log(chalk.blue('Starting splash build: '), chalk.magenta(cwd));
    build_and_output();
}